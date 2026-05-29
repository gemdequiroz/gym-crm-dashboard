import { X } from 'lucide-react'
import { ALL_STATUS, type StatusFilter } from '../../hooks/useLeadFilters'
import type { LeadStatus } from '../../types'
import { LeadSearchBar } from './LeadSearchBar'

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
        <label className="filter-select">
          <span className="sr-only">Filter by status</span>
          <select
            value={statusFilter}
            onChange={(e) =>
              onStatusChange(e.target.value as LeadStatus | typeof ALL_STATUS)
            }
          >
            <option value={ALL_STATUS}>All statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="trial_booked">Trial Booked</option>
            <option value="hot">Hot</option>
            <option value="nurturing">Nurturing</option>
          </select>
        </label>
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
