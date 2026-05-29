import { useState, type ReactNode } from 'react'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const closeSidebar = () => setSidebarOpen(false)
  const toggleSidebar = () => setSidebarOpen((prev) => !prev)

  return (
    <div className="app-layout">
      <Sidebar open={sidebarOpen} onClose={closeSidebar} />

      <button
        type="button"
        className={`app-layout__backdrop${sidebarOpen ? ' app-layout__backdrop--visible' : ''}`}
        aria-label="Close navigation menu"
        onClick={closeSidebar}
      />

      <div className="app-layout__main">
        <Header onMenuClick={toggleSidebar} menuExpanded={sidebarOpen} />
        <main className="app-layout__content">{children}</main>
      </div>
    </div>
  )
}
