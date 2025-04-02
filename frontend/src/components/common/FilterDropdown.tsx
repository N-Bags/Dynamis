import React from 'react';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: FilterOption[];
  label: string;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ value, onChange, options, label }) => {
  return (
    <div className="flex items-center space-x-2">
      <label className="text-sm font-medium text-gray-700">{label}:</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border border-gray-300 py-1.5 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown; 