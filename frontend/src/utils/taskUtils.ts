import { getDaysUntil, isOverdue } from './dateUtils';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'todo' | 'in_progress' | 'completed';
  deadline: string;
  assignedTo: string;
  dependencies: string[];
}

export const calculateTaskPriority = (task: Task): number => {
  let priorityScore = 0;

  // Base priority scores
  const priorityScores = {
    high: 3,
    medium: 2,
    low: 1,
  };

  // Status scores
  const statusScores = {
    todo: 3,
    in_progress: 2,
    completed: 0,
  };

  // Add base priority score
  priorityScore += priorityScores[task.priority];

  // Add status score
  priorityScore += statusScores[task.status];

  // Add deadline urgency
  const daysUntilDeadline = getDaysUntil(task.deadline);
  if (isOverdue(task.deadline)) {
    priorityScore += 5; // Overdue tasks get highest priority
  } else if (daysUntilDeadline <= 1) {
    priorityScore += 4; // Due today or tomorrow
  } else if (daysUntilDeadline <= 3) {
    priorityScore += 3; // Due within 3 days
  } else if (daysUntilDeadline <= 7) {
    priorityScore += 2; // Due within a week
  }

  return priorityScore;
};

export const sortTasksByPriority = (tasks: Task[]): Task[] => {
  return [...tasks].sort((a, b) => {
    const priorityA = calculateTaskPriority(a);
    const priorityB = calculateTaskPriority(b);
    return priorityB - priorityA; // Higher priority first
  });
};

export const getTaskStatusColor = (status: Task['status']): string => {
  const colors = {
    todo: 'bg-gray-100 text-gray-800',
    in_progress: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
  };
  return colors[status];
};

export const getPriorityColor = (priority: Task['priority']): string => {
  const colors = {
    high: 'text-red-600',
    medium: 'text-yellow-600',
    low: 'text-green-600',
  };
  return colors[priority];
};

export const getTaskProgress = (tasks: Task[]): number => {
  if (tasks.length === 0) return 0;
  const completedTasks = tasks.filter((task) => task.status === 'completed').length;
  return (completedTasks / tasks.length) * 100;
};

export const getTasksByStatus = (tasks: Task[], status: Task['status']): Task[] => {
  return tasks.filter((task) => task.status === status);
};

export const getTasksByPriority = (tasks: Task[], priority: Task['priority']): Task[] => {
  return tasks.filter((task) => task.priority === priority);
};

export const getTasksByAssignee = (tasks: Task[], assignee: string): Task[] => {
  return tasks.filter((task) => task.assignedTo === assignee);
}; 