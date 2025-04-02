import { formatCurrency, calculatePercentage, calculateGrowth } from './currencyUtils';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  netBalance: number;
  incomeByCategory: Record<string, number>;
  expensesByCategory: Record<string, number>;
  monthlyTrends: {
    income: number[];
    expenses: number[];
  };
}

export const calculateFinancialSummary = (transactions: Transaction[]): FinancialSummary => {
  const summary: FinancialSummary = {
    totalIncome: 0,
    totalExpenses: 0,
    netBalance: 0,
    incomeByCategory: {},
    expensesByCategory: {},
    monthlyTrends: {
      income: [],
      expenses: [],
    },
  };

  // Calculate totals and categorize transactions
  transactions.forEach((transaction) => {
    if (transaction.type === 'income') {
      summary.totalIncome += transaction.amount;
      summary.incomeByCategory[transaction.category] =
        (summary.incomeByCategory[transaction.category] || 0) + transaction.amount;
    } else {
      summary.totalExpenses += transaction.amount;
      summary.expensesByCategory[transaction.category] =
        (summary.expensesByCategory[transaction.category] || 0) + transaction.amount;
    }
  });

  // Calculate net balance
  summary.netBalance = summary.totalIncome - summary.totalExpenses;

  // Calculate monthly trends
  const currentDate = new Date();
  const last12Months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(currentDate);
    date.setMonth(date.getMonth() - i);
    return date.toISOString().slice(0, 7); // Format: YYYY-MM
  }).reverse();

  last12Months.forEach((month) => {
    const monthTransactions = transactions.filter((t) => t.date.startsWith(month));
    const monthIncome = monthTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const monthExpenses = monthTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    summary.monthlyTrends.income.push(monthIncome);
    summary.monthlyTrends.expenses.push(monthExpenses);
  });

  return summary;
};

export const getTopCategories = (
  transactions: Transaction[],
  type: 'income' | 'expense',
  limit: number = 5
): { category: string; amount: number; percentage: number }[] => {
  const categoryTotals = transactions
    .filter((t) => t.type === type)
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const total = Object.values(categoryTotals).reduce((sum, amount) => sum + amount, 0);

  return Object.entries(categoryTotals)
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: calculatePercentage(amount, total),
    }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, limit);
};

export const calculateBudgetMetrics = (
  transactions: Transaction[],
  budget: Record<string, number>
): Record<string, { spent: number; remaining: number; percentage: number }> => {
  const metrics: Record<string, { spent: number; remaining: number; percentage: number }> = {};

  // Calculate spent amounts by category
  transactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      if (!metrics[t.category]) {
        metrics[t.category] = {
          spent: 0,
          remaining: budget[t.category] || 0,
          percentage: 0,
        };
      }
      metrics[t.category].spent += t.amount;
    });

  // Calculate remaining amounts and percentages
  Object.entries(metrics).forEach(([category, metric]) => {
    metric.remaining = (budget[category] || 0) - metric.spent;
    metric.percentage = calculatePercentage(metric.spent, budget[category] || 0);
  });

  return metrics;
};

export const generateFinancialReport = (transactions: Transaction[]): string => {
  const summary = calculateFinancialSummary(transactions);
  const topIncome = getTopCategories(transactions, 'income');
  const topExpenses = getTopCategories(transactions, 'expense');

  let report = 'Financial Report\n\n';
  report += `Total Income: ${formatCurrency(summary.totalIncome)}\n`;
  report += `Total Expenses: ${formatCurrency(summary.totalExpenses)}\n`;
  report += `Net Balance: ${formatCurrency(summary.netBalance)}\n\n`;

  report += 'Top Income Categories:\n';
  topIncome.forEach(({ category, amount, percentage }) => {
    report += `${category}: ${formatCurrency(amount)} (${percentage.toFixed(1)}%)\n`;
  });

  report += '\nTop Expense Categories:\n';
  topExpenses.forEach(({ category, amount, percentage }) => {
    report += `${category}: ${formatCurrency(amount)} (${percentage.toFixed(1)}%)\n`;
  });

  return report;
}; 