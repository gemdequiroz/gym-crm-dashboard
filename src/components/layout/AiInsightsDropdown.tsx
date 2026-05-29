import { useEffect, useRef, useState } from 'react'
import { Sparkles, X } from 'lucide-react'
import { aiRecommendations } from '../../data/mockData'
import type { RecommendationPriority } from '../../types'

const priorityLabels: Record<RecommendationPriority, string> = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
}

export function AiInsightsDropdown() {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const count = aiRecommendations.length

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
    <div className="ai-insights" ref={rootRef}>
      <button
        type="button"
        className={`header__pill header__pill--btn${open ? ' header__pill--active' : ''}`}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="ai-insights-panel"
      >
        <Sparkles size={14} aria-hidden />
        <span className="header__pill-text">AI Insights Active</span>
        <span className="ai-insights__badge" aria-label={`${count} recommendations`}>
          {count}
        </span>
      </button>

      {open && (
        <div
          id="ai-insights-panel"
          className="ai-insights__panel"
          role="dialog"
          aria-label="AI recommendations"
        >
          <header className="ai-insights__header">
            <div>
              <h2 className="ai-insights__title">AI Recommendations</h2>
              <p className="ai-insights__subtitle">Powered by AI · {count} insights</p>
            </div>
            <button
              type="button"
              className="ai-insights__close"
              onClick={() => setOpen(false)}
              aria-label="Close recommendations"
            >
              <X size={18} />
            </button>
          </header>

          <ul className="ai-insights__list">
            {aiRecommendations.map((rec) => (
              <li
                key={rec.id}
                className={`ai-insights__item ai-insights__item--${rec.priority}`}
              >
                <div className="ai-insights__item-top">
                  <span
                    className={`ai-insights__priority ai-insights__priority--${rec.priority}`}
                  >
                    {priorityLabels[rec.priority]}
                  </span>
                  <span className="ai-insights__lead">
                    {rec.leadName ?? 'All leads'}
                  </span>
                </div>
                <h3 className="ai-insights__item-title">{rec.title}</h3>
                <p className="ai-insights__item-body">{rec.body}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
