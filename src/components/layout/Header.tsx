import { Menu, Plus } from 'lucide-react'
import { pageTitles } from '../../data/mockData'
import { useApp } from '../../context/AppContext'
import { AiInsightsActive } from './AiInsightsActive'
import { NotificationBell } from './NotificationBell'
import { ThemeToggle } from './ThemeToggle'

interface HeaderProps {
  onMenuClick: () => void
  menuExpanded: boolean
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function Header({ onMenuClick, menuExpanded }: HeaderProps) {
  const { page, openAddLead } = useApp()
  const showAddLead = page === 'dashboard' || page === 'leads'

  return (
    <header className="header">
      <div className="header__left">
        <button
          type="button"
          className="header__menu-btn"
          onClick={onMenuClick}
          aria-expanded={menuExpanded}
          aria-label="Toggle navigation menu"
        >
          <Menu size={20} />
        </button>
        <div>
          <h1 className="header__title">{pageTitles[page]}</h1>
          <p className="header__date">{formatDate(new Date())}</p>
        </div>
      </div>
      <div className="header__right">
        {showAddLead && (
          <button type="button" className="btn btn--primary" onClick={openAddLead}>
            <Plus size={18} aria-hidden />
            Add Lead
          </button>
        )}
        <ThemeToggle />
        <div className="header__notifications">
          <AiInsightsActive />
          <NotificationBell />
        </div>
      </div>
    </header>
  )
}
