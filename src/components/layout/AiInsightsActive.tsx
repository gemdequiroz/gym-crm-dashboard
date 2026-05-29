import { Sparkles } from 'lucide-react'

export function AiInsightsActive() {
  return (
    <span className="header__pill header__pill--status" aria-label="AI insights active">
      <Sparkles size={14} aria-hidden />
      <span className="header__pill-text">AI Insights Active</span>
    </span>
  )
}
