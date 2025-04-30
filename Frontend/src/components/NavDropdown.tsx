"use client";

import { useState, useEffect } from "react";

export default function NavDropdown({ label, items }: { label: string; items: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {label}
      </button>

      {isOpen && (
        <ul className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 text-black dark:text-white shadow-lg z-50 border rounded">
          {items.map((item) => (
            <li key={item} className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 