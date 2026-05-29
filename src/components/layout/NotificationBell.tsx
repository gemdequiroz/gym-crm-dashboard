import { useEffect, useRef, useState } from 'react'
import { Bell, X } from 'lucide-react'
import {
  getRecommendationCount,
  RecommendationsList,
} from './RecommendationsList'

export function NotificationBell() {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const count = getRecommendationCount()

  useEffect(() => {
    if (!open) return

    const handleClickOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open])

  return (
    <div className="notification-bell" ref={rootRef}>
      <button
        type="button"
        className={`notification-bell__btn${open ? ' notification-bell__btn--active' : ''}`}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="notification-panel"
        aria-label={`Notifications, ${count} AI recommendations`}
      >
        <Bell size={18} aria-hidden />
        {count > 0 && (
          <span className="notification-bell__badge" aria-hidden>
            {count}
          </span>
        )}
      </button>

      {open && (
        <div
          id="notification-panel"
          className="ai-insights__panel notification-bell__panel"
          role="dialog"
          aria-label="AI recommendations"
        >
          <header className="ai-insights__header">
            <div>
              <h2 className="ai-insights__title">AI Recommendations</h2>
              <p className="ai-insights__subtitle">
                Powered by AI · {count} insights
              </p>
            </div>
            <button
              type="button"
              className="ai-insights__close"
              onClick={() => setOpen(false)}
              aria-label="Close notifications"
            >
              <X size={18} />
            </button>
          </header>
          <RecommendationsList />
        </div>
      )}
    </div>
  )
}
