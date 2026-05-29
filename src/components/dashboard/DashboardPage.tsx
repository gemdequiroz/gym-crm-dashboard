import { useApp } from '../../context/AppContext'
import { KpiCards } from './KpiCards'
import { LeadTable } from './LeadTable'

export function DashboardPage() {
  const { leads } = useApp()

  return (
    <>
      <KpiCards />
      <LeadTable leads={leads} />
    </>
  )
}
