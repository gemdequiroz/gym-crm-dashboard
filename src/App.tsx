import { AppLayout } from './components/layout/AppLayout'
import { AppRouter } from './components/AppRouter'
import { AddLeadModal } from './components/leads/AddLeadModal'
import { AppProvider } from './context/AppContext'

function App() {
  return (
    <AppProvider>
      <AppLayout>
        <AppRouter />
      </AppLayout>
      <AddLeadModal />
    </AppProvider>
  )
}

export default App
