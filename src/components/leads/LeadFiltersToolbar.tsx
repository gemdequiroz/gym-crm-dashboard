import { X } from 'lucide-react'
import type { StatusFilter } from '../../types'
import { LeadSearchBar } from './LeadSearchBar'
import { StatusFilterDropdown } from './StatusFilterDropdown'

interface LeadFiltersToolbarProps {
  search: string
  onSearchChange: (value: string) => void
  statusFilter: StatusFilter
  onStatusChange: (value: StatusFilter) => void
  hasActiveFilters: boolean
  onClear: () => void
  resultCount: number
  totalCount: number
}

export function LeadFiltersToolbar({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  hasActiveFilters,
  onClear,
  resultCount,
  totalCount,
}: LeadFiltersToolbarProps) {
  return (
    <div className="lead-filters">
      <div className="page-toolbar">
        <LeadSearchBar value={search} onChange={onSearchChange} />
        <StatusFilterDropdown value={statusFilter} onChange={onStatusChange} />
        {hasActiveFilters && (
          <button
            type="button"
            className="btn btn--ghost lead-filters__clear"
            onClick={onClear}
          >
            <X size={16} aria-hidden />
            Clear
          </button>
        )}
      </div>
      <p className="lead-filters__count" aria-live="polite">
        Showing {resultCount} of {totalCount} leads
      </p>
    </div>
  )
}
