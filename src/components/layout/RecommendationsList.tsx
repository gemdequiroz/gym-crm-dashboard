import type { RecommendationPriority } from '../../types'
import { aiRecommendations } from '../../data/mockData'

const priorityLabels: Record<RecommendationPriority, string> = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
}

export function RecommendationsList() {
  return (
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
  )
}

export function getRecommendationCount() {
  return aiRecommendations.length
}
