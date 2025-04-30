"use client";

import React from 'react'

interface Event {
  id: number
  title: string
  date: string
  time: string
}

interface CalendarHeaderProps {
  onToday: () => void
  onPrevious: () => void
  onNext: () => void
  onViewChange: (view: 'week' | 'month' | 'agenda') => void
  currentView: 'week' | 'month' | 'agenda'
}

interface UpcomingEventsProps {
  events: Event[]
}

// Calendar Header Component
function CalendarHeader({ 
  onToday, 
  onPrevious, 
  onNext, 
  onViewChange,
  currentView 
}: CalendarHeaderProps) {
  return (
    <header>
      <h1>Calendar</h1>
      
      <nav aria-label="Calendar Navigation">
        <button onClick={onToday}>Today</button>
        <button onClick={onPrevious} aria-label="Previous period">←</button>
        <button onClick={onNext} aria-label="Next period">→</button>
      </nav>

      <div>
        <label htmlFor="view-select">View:</label>
        <select 
          id="view-select" 
          value={currentView}
          onChange={(e) => onViewChange(e.target.value as 'week' | 'month' | 'agenda')}
        >
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="agenda">Agenda</option>
        </select>
      </div>
    </header>
  )
}

// Calendar Grid Component
function CalendarGrid() {
  return (
    <section aria-label="Calendar">
      <div role="grid" aria-label="Calendar Grid">
        Calendar grid would render here
      </div>
    </section>
  )
}

// Upcoming Events Component
function UpcomingEvents({ events }: UpcomingEventsProps) {
  return (
    <aside aria-label="Upcoming Events">
      <h2>Upcoming Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <article>
              <h3>{event.title}</h3>
              <time dateTime={`${event.date}T${event.time}`}>
                {new Date(`${event.date}T${event.time}`).toLocaleString()}
              </time>
            </article>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default function CalendarPage() {
  // Mock data - replace with actual data fetching
  const events: Event[] = [
    {
      id: 1,
      title: 'Quarterly Review',
      date: '2024-03-29',
      time: '10:00'
    },
    {
      id: 2,
      title: 'Client Meeting',
      date: '2024-04-02',
      time: '15:00'
    },
    {
      id: 3,
      title: 'System Upgrade',
      date: '2024-04-04',
      time: '08:00'
    }
  ]

  const [currentView, setCurrentView] = React.useState<'week' | 'month' | 'agenda'>('week')

  const handleToday = () => {
    // Implement today functionality
  }

  const handlePrevious = () => {
    // Implement previous period functionality
  }

  const handleNext = () => {
    // Implement next period functionality
  }

  return (
    <main>
      <CalendarHeader 
        onToday={handleToday}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onViewChange={setCurrentView}
        currentView={currentView}
      />

      <div>
        <CalendarGrid />
        
        <UpcomingEvents events={events} />
      </div>
    </main>
  )
} 