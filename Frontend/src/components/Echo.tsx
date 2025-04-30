"use client";

import React from 'react'
import { Bot } from 'lucide-react'

export default function Echo() {
  const [isOpen, setIsOpen] = React.useState(false)

  // Close panel on Escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200 z-50"
        aria-label="Toggle Echo Command Center"
      >
        <Bot className="w-6 h-6" />
      </button>

      {/* Command Panel */}
      <div
        className={`fixed bottom-20 right-6 w-96 bg-white dark:bg-gray-800 shadow-xl rounded-lg p-4 transition-all duration-200 transform ${
          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
        } z-40`}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Echo Command Center
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Close Echo Command Center"
          >
            ×
          </button>
        </div>

        <div className="text-gray-600 dark:text-gray-300">
          <p>Ready to assist you.</p>
          {/* Placeholder for future AI interaction */}
        </div>
      </div>
    </>
  )
} 