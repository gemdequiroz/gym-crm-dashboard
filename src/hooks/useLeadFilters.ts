import { useMemo, useState } from 'react'
import type { Lead, LeadStatus } from '../types'
import { filterLeadsBySearch } from '../utils/filterLeads'

export const ALL_STATUS = 'all' as const
export type StatusFilter = LeadStatus | typeof ALL_STATUS

export function useLeadFilters(leads: Lead[]) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(ALL_STATUS)

  const filteredLeads = useMemo(() => {
    const bySearch = filterLeadsBySearch(leads, search)
    return bySearch.filter(
      (lead) => statusFilter === ALL_STATUS || lead.status === statusFilter,
    )
  }, [leads, search, statusFilter])

  const isSearching = search.trim().length > 0

  const hasActiveFilters =
    isSearching || statusFilter !== ALL_STATUS

  const clearFilters = () => {
    setSearch('')
    setStatusFilter(ALL_STATUS)
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
