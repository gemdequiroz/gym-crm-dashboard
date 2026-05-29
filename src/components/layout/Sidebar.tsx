import {
  BarChart3,
  Dumbbell,
  LayoutDashboard,
  Settings,
  Users,
  Layers,
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import type { PageId } from '../../types'

const navItems: { id: PageId; label: string; icon: typeof LayoutDashboard }[] =
  [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'leads', label: 'Leads', icon: Users },
    { id: 'programs', label: 'Programs', icon: Layers },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const { page, setPage } = useApp()

  const navigate = (id: PageId) => {
    setPage(id)
    onClose()
  }

  return (
    <aside
      className={`sidebar${open ? ' sidebar--open' : ''}`}
      aria-label="Main navigation"
    >
      <div className="sidebar__brand">
        <div className="sidebar__logo" aria-hidden>
          <Dumbbell size={20} />
        </div>
        <span className="sidebar__brand-text">FitPulse CRM</span>
      </div>

      <nav className="sidebar__nav">
        {navItems.map(({ id, label, icon: Icon }) => {
          const active = page === id
          return (
            <button
              key={id}
              type="button"
              className={`sidebar__link${active ? ' sidebar__link--active' : ''}`}
              aria-current={active ? 'page' : undefined}
              onClick={() => navigate(id)}
            >
              <Icon size={18} aria-hidden />
              {label}
            </button>
          )
        })}
      </nav>

      <div className="sidebar__footer">Gym & Fitness CRM v1.0</div>
    </aside>
  )
}
