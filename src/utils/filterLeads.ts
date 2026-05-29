import type { Lead, LeadFilterCategory, StatusFilter } from '../types'
import { ALL_STATUS_FILTER } from '../types'

export const STATUS_FILTER_OPTIONS: {
  value: StatusFilter
  label: string
}[] = [
  { value: ALL_STATUS_FILTER, label: 'All statuses' },
  { value: 'hot', label: 'Hot' },
  { value: 'trial_booked', label: 'Trial Booked' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'warm', label: 'Warm' },
  { value: 'cold', label: 'Cold' },
]

/** Maps a lead to one filter category (mutually exclusive). */
export function getLeadFilterCategory(lead: Lead): LeadFilterCategory {
  if (lead.status === 'trial_booked') return 'trial_booked'
  if (lead.status === 'hot' || lead.aiScore >= 80) return 'hot'
  if (lead.status === 'contacted') return 'contacted'
  if (lead.aiScore >= 60) return 'warm'
  return 'cold'
}

export function filterLeadsBySearch(leads: Lead[], query: string): Lead[] {
  const q = query.trim().toLowerCase()
  if (!q) return leads

  return leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(q) ||
      lead.email.toLowerCase().includes(q),
  )
}

export function filterLeadsByStatus(
  leads: Lead[],
  statusFilter: StatusFilter,
): Lead[] {
  if (statusFilter === ALL_STATUS_FILTER) return leads
  return leads.filter(
    (lead) => getLeadFilterCategory(lead) === statusFilter,
  )
}

export function filterLeads(
  leads: Lead[],
  search: string,
  statusFilter: StatusFilter,
): Lead[] {
  return filterLeadsByStatus(filterLeadsBySearch(leads, search), statusFilter)
}
