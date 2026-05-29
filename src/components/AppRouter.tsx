import { useApp } from '../context/AppContext'
import { DashboardPage } from './dashboard/DashboardPage'
import { LeadsPage } from '../pages/LeadsPage'
import { ProgramsPage } from '../pages/ProgramsPage'
import { AnalyticsPage } from '../pages/AnalyticsPage'
import { SettingsPage } from '../pages/SettingsPage'

export function AppRouter() {
  const { page } = useApp()

  switch (page) {
    case 'dashboard':
      return <DashboardPage />
    case 'leads':
      return <LeadsPage />
    case 'programs':
      return <ProgramsPage />
    case 'analytics':
      return <AnalyticsPage />
    case 'settings':
      return <SettingsPage />
    default:
      return <DashboardPage />
  }
}
