"use client";

import React from 'react'

interface Task {
  id: number
  title: string
  dueDate: string
  priority: 'high' | 'medium' | 'low'
  subtasks: string[]
  notes: string
  aiSuggestion: string
}

interface TaskListProps {
  tasks: Task[]
  onTaskClick: (task: Task) => void
}

interface PrioritySidebarProps {
  tasks: Task[]
  onTaskClick: (task: Task) => void
}

// Task List Component
function TaskList({ tasks, onTaskClick }: TaskListProps) {
  return (
    <section aria-label="Task List">
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <article>
              <header>
                <h3>{task.title}</h3>
                <time dateTime={task.dueDate}>
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </time>
              </header>

              <div>
                <h4>Subtasks</h4>
                <ul>
                  {task.subtasks.map((subtask, index) => (
                    <li key={index}>
                      <input type="checkbox" id={`subtask-${task.id}-${index}`} />
                      <label htmlFor={`subtask-${task.id}-${index}`}>{subtask}</label>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4>Notes</h4>
                <p>{task.notes}</p>
              </div>

              <footer>
                <p><em>{task.aiSuggestion}</em></p>
              </footer>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}

// Priority Sidebar Component
function PrioritySidebar({ tasks, onTaskClick }: PrioritySidebarProps) {
  const priorityGroups = {
    high: tasks.filter(task => task.priority === 'high'),
    medium: tasks.filter(task => task.priority === 'medium'),
    low: tasks.filter(task => task.priority === 'low')
  }

  return (
    <aside aria-label="Priority Groups">
      <section>
        <h2>High Priority</h2>
        <ul>
          {priorityGroups.high.map(task => (
            <li key={task.id}>
              <button onClick={() => onTaskClick(task)}>{task.title}</button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Medium Priority</h2>
        <ul>
          {priorityGroups.medium.map(task => (
            <li key={task.id}>
              <button onClick={() => onTaskClick(task)}>{task.title}</button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Low Priority</h2>
        <ul>
          {priorityGroups.low.map(task => (
            <li key={task.id}>
              <button onClick={() => onTaskClick(task)}>{task.title}</button>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  )
}

export default function TasksPage() {
  // Mock data - replace with actual data fetching
  const tasks: Task[] = [
    {
      id: 1,
      title: 'Complete Project Proposal',
      dueDate: '2024-03-20',
      priority: 'high',
      subtasks: [
        'Research market trends',
        'Draft executive summary',
        'Prepare budget estimates'
      ],
      notes: 'Need to include latest market analysis and competitor pricing.',
      aiSuggestion: 'Consider adding a section about potential risks and mitigation strategies.'
    },
    {
      id: 2,
      title: 'Update Documentation',
      dueDate: '2024-03-25',
      priority: 'medium',
      subtasks: [
        'Update API documentation',
        'Review user guides',
        'Check for broken links'
      ],
      notes: 'Focus on the new features added in the last release.',
      aiSuggestion: 'Consider adding code examples for common use cases.'
    }
  ]

  const [selectedTask, setSelectedTask] = React.useState<Task | null>(null)
  const [filter, setFilter] = React.useState<'all' | 'high' | 'medium' | 'low'>('all')

  const handleNewTask = () => {
    // Implement new task functionality
  }

  const handleViewMode = () => {
    // Implement view mode toggle
  }

  return (
    <main>
      <header>
        <h1>Tasks</h1>
        
        <nav aria-label="Task Filters">
          <ul>
            <li>
              <button onClick={() => setFilter('all')}>All</button>
            </li>
            <li>
              <button onClick={() => setFilter('high')}>High Priority</button>
            </li>
            <li>
              <button onClick={() => setFilter('medium')}>Medium</button>
            </li>
            <li>
              <button onClick={() => setFilter('low')}>Low</button>
            </li>
          </ul>
        </nav>

        <div>
          <button onClick={handleNewTask}>New Task</button>
          <button onClick={handleViewMode}>View Mode</button>
        </div>
      </header>

      <div>
        <TaskList 
          tasks={tasks.filter(task => filter === 'all' || task.priority === filter)} 
          onTaskClick={setSelectedTask} 
        />
        
        <PrioritySidebar 
          tasks={tasks} 
          onTaskClick={setSelectedTask} 
        />
      </div>
    </main>
  )
} 