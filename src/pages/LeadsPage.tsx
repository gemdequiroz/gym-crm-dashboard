import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { LeadTable } from '../components/dashboard/LeadTable'
import type { LeadStatus } from '../types'

const ALL_STATUS = 'all' as const

export function LeadsPage() {
  const { leads } = useApp()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<LeadStatus | typeof ALL_STATUS>(
    ALL_STATUS,
  )

  const filtered = useMemo(() => {
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
        lead.leadSource.toLowerCase().includes(q)
      return matchesStatus && matchesSearch
    })
  }, [leads, search, statusFilter])

  return (
    <div className="page">
      <div className="page-toolbar">
        <div className="search-input">
          <Search size={18} aria-hidden />
          <input
            type="search"
            placeholder="Search leads by name, email, program..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search leads"
          />
        </div>
        <label className="filter-select">
          <span className="sr-only">Filter by status</span>
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value as LeadStatus | typeof ALL_STATUS,
              )
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
      </div>
      <LeadTable
        leads={filtered}
        title="All Leads"
        subtitle={`Showing ${filtered.length} of ${leads.length} leads`}
        emptyMessage="No leads match your search or filter."
      />
    </div>
  )
}
