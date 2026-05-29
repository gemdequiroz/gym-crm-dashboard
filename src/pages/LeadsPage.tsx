import { useApp } from '../context/AppContext'
import { LeadTable } from '../components/dashboard/LeadTable'
import { LeadFiltersToolbar } from '../components/leads/LeadFiltersToolbar'
import { useLeadFilters } from '../hooks/useLeadFilters'

export function LeadsPage() {
  const { leads } = useApp()
  const {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    filteredLeads,
    hasActiveFilters,
    clearFilters,
  } = useLeadFilters(leads)

  return (
    <div className="page">
      <LeadFiltersToolbar
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        hasActiveFilters={hasActiveFilters}
        onClear={clearFilters}
        resultCount={filteredLeads.length}
        totalCount={leads.length}
      />
      <LeadTable
        leads={filteredLeads}
        title="All Leads"
        subtitle={
          hasActiveFilters
            ? `${filteredLeads.length} matching leads`
            : `${leads.length} total leads`
        }
        emptyMessage="No leads match your search or filter."
      />
    </div>
  )
}
