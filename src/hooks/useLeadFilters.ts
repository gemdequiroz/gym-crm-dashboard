import { useMemo, useState } from 'react'
import type { Lead, LeadStatus } from '../types'

export const ALL_STATUS = 'all' as const
export type StatusFilter = LeadStatus | typeof ALL_STATUS

export function useLeadFilters(leads: Lead[]) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(ALL_STATUS)

  const filteredLeads = useMemo(() => {
    const q = search.trim().toLowerCase()
    return leads.filter((lead) => {
      const matchesStatus =
        statusFilter === ALL_STATUS || lead.status === statusFilter
      const matchesSearch =
        !q ||
        lead.name.toLowerCase().includes(q) ||
        lead.email.toLowerCase().includes(q) ||
        lead.phone.includes(q) ||
        lead.fitnessGoal.toLowerCase().includes(q) ||
        lead.interestedProgram.toLowerCase().includes(q) ||
        lead.leadSource.toLowerCase().includes(q) ||
        lead.nextAction.toLowerCase().includes(q)
      return matchesStatus && matchesSearch
    })
  }, [leads, search, statusFilter])

  const hasActiveFilters =
    search.trim().length > 0 || statusFilter !== ALL_STATUS

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
    hasActiveFilters,
    clearFilters,
  }
}
