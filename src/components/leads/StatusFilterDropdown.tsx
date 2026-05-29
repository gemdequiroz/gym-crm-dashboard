import { STATUS_FILTER_OPTIONS } from '../../utils/filterLeads'
import type { StatusFilter } from '../../types'

interface StatusFilterDropdownProps {
  value: StatusFilter
  onChange: (value: StatusFilter) => void
}

export function StatusFilterDropdown({ value, onChange }: StatusFilterDropdownProps) {
  return (
    <label className="filter-select">
      <span className="sr-only">Filter by status</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as StatusFilter)}
        aria-label="Filter leads by status"
      >
        {STATUS_FILTER_OPTIONS.map(({ value: optValue, label }) => (
          <option key={optValue} value={optValue}>
            {label}
          </option>
        ))}
      </select>
    </label>
  )
}
