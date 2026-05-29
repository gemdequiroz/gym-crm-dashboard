interface AiScoreBadgeProps {
  score: number
}

function getTier(score: number): 'hot' | 'warm' | 'cool' {
  if (score >= 80) return 'hot'
  if (score >= 60) return 'warm'
  return 'cool'
}

export function AiScoreBadge({ score }: AiScoreBadgeProps) {
  const tier = getTier(score)
  return (
    <span className={`ai-score ai-score--${tier}`}>
      <span className="ai-score__dot" aria-hidden />
      {score}
    </span>
  )
}
