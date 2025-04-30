"use client";

import React from 'react'

interface Transaction {
  id: number
  description: string
  amount: number
  date: string
  type: 'income' | 'expense'
}

interface FinancialSummary {
  totalIncome: number
  totalExpenses: number
  netProfit: number
  incomeChange: number
  expensesChange: number
  profitChange: number
}

interface Report {
  id: number
  title: string
  date: string
  type: string
}

interface HeaderProps {
  onAddTransaction: () => void
  onDownloadReport: () => void
  onFilterChange: (filter: string) => void
}

interface FinancialSummaryProps {
  summary: FinancialSummary
}

interface RecentTransactionsProps {
  transactions: Transaction[]
}

interface ReportsProps {
  reports: Report[]
}

// Header Component
function Header({ onAddTransaction, onDownloadReport, onFilterChange }: HeaderProps) {
  return (
    <header>
      <h1>Finances</h1>
      
      <nav aria-label="Financial Actions">
        <button onClick={onAddTransaction}>Add Transaction</button>
        <button onClick={onDownloadReport}>Download Report</button>
      </nav>

      <div>
        <label htmlFor="filter-select">Filter:</label>
        <select 
          id="filter-select" 
          onChange={(e) => onFilterChange(e.target.value)}
        >
          <option value="this-month">This Month</option>
          <option value="last-month">Last Month</option>
          <option value="custom">Custom Range</option>
        </select>
      </div>
    </header>
  )
}

// Financial Summary Component
function FinancialSummary({ summary }: FinancialSummaryProps) {
  return (
    <section aria-label="Financial Summary">
      <h2>Summary</h2>
      
      <div>
        <article>
          <h3>Total Income</h3>
          <p>${summary.totalIncome.toLocaleString()}</p>
          <p>{summary.incomeChange > 0 ? '+' : ''}{summary.incomeChange}%</p>
        </article>

        <article>
          <h3>Total Expenses</h3>
          <p>${summary.totalExpenses.toLocaleString()}</p>
          <p>{summary.expensesChange > 0 ? '+' : ''}{summary.expensesChange}%</p>
        </article>

        <article>
          <h3>Net Profit</h3>
          <p>${summary.netProfit.toLocaleString()}</p>
          <p>{summary.profitChange > 0 ? '+' : ''}{summary.profitChange}%</p>
        </article>
      </div>
    </section>
  )
}

// Recent Transactions Component
function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <section aria-label="Recent Transactions">
      <h2>Recent Transactions</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            <article>
              <h3>{transaction.description}</h3>
              <p>${Math.abs(transaction.amount).toLocaleString()}</p>
              <time dateTime={transaction.date}>
                {new Date(transaction.date).toLocaleDateString()}
              </time>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}

// Reports Component
function Reports({ reports }: ReportsProps) {
  return (
    <section aria-label="Financial Reports">
      <h2>Reports</h2>
      <ul>
        {reports.map((report) => (
          <li key={report.id}>
            <article>
              <h3>{report.title}</h3>
              <p>{report.type}</p>
              <time dateTime={report.date}>
                {new Date(report.date).toLocaleDateString()}
              </time>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default function FinancesPage() {
  // Mock data - replace with actual data fetching
  const summary: FinancialSummary = {
    totalIncome: 12500,
    totalExpenses: 8500,
    netProfit: 4000,
    incomeChange: 12,
    expensesChange: -5,
    profitChange: 8
  }

  const transactions: Transaction[] = [
    {
      id: 1,
      description: 'Invoice Payment from Acme Corp',
      amount: 4500,
      date: '2024-04-02',
      type: 'income'
    },
    {
      id: 2,
      description: 'Team Lunch',
      amount: -132,
      date: '2024-04-03',
      type: 'expense'
    },
    {
      id: 3,
      description: 'Software Subscription',
      amount: -299,
      date: '2024-04-04',
      type: 'expense'
    }
  ]

  const reports: Report[] = [
    {
      id: 1,
      title: 'Q1 Profit & Loss',
      date: '2024-03-31',
      type: 'Quarterly'
    },
    {
      id: 2,
      title: 'Monthly Spend Breakdown',
      date: '2024-03-31',
      type: 'Monthly'
    },
    {
      id: 3,
      title: 'Customer Invoicing Report',
      date: '2024-03-31',
      type: 'Custom'
    }
  ]

  const handleAddTransaction = () => {
    // Implement add transaction functionality
  }

  const handleDownloadReport = () => {
    // Implement download report functionality
  }

  const handleFilterChange = (filter: string) => {
    // Implement filter change functionality
  }

  return (
    <main>
      <Header 
        onAddTransaction={handleAddTransaction}
        onDownloadReport={handleDownloadReport}
        onFilterChange={handleFilterChange}
      />

      <FinancialSummary summary={summary} />
      
      <RecentTransactions transactions={transactions} />
      
      <Reports reports={reports} />
    </main>
  )
} 