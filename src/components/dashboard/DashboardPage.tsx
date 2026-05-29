import { useApp } from '../../context/AppContext'
import { useLeadFilters } from '../../hooks/useLeadFilters'
import { LeadFiltersToolbar } from '../leads/LeadFiltersToolbar'
import { KpiCards } from './KpiCards'
import { LeadTable } from './LeadTable'

export function DashboardPage() {
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
    <>
      <KpiCards />
      <div className="page page--embedded">
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
          subtitle={
            hasActiveFilters
              ? `${filteredLeads.length} matching leads`
              : `${leads.length} active prospects`
          }
          emptyMessage="No leads match your search or filter."
        />
      </div>
    </>
  )
}
