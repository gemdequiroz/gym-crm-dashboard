import type { Lead } from '../types'

export function filterLeadsBySearch(leads: Lead[], query: string): Lead[] {
  const q = query.trim().toLowerCase()
  if (!q) return leads

  return leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(q) ||
      lead.email.toLowerCase().includes(q),
  )
}
