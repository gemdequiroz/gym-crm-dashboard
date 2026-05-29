import { useMemo, useState } from 'react'
import type { Lead, StatusFilter } from '../types'
import { ALL_STATUS_FILTER } from '../types'
import { filterLeads } from '../utils/filterLeads'

export { ALL_STATUS_FILTER as ALL_STATUS }
export type { StatusFilter }

export function useLeadFilters(leads: Lead[]) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(ALL_STATUS_FILTER)

  const filteredLeads = useMemo(
    () => filterLeads(leads, search, statusFilter),
    [leads, search, statusFilter],
  )

  const isSearching = search.trim().length > 0

  const hasActiveFilters =
    isSearching || statusFilter !== ALL_STATUS_FILTER

  const clearFilters = () => {
    setSearch('')
    setStatusFilter(ALL_STATUS_FILTER)
  }

  return {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    filteredLeads,
    isSearching,
    hasActiveFilters,
    clearFilters,
  }
}
