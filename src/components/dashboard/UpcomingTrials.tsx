import { trialSessions } from '../../data/mockData'
import { Card } from '../ui/Card'

export function UpcomingTrials() {
  return (
    <Card
      title="Upcoming Trial Sessions"
      subtitle={`${trialSessions.length} scheduled`}
    >
      <ul className="trial-list">
        {trialSessions.map((session) => (
          <li key={session.id} className="trial-item">
            <div className="trial-item__time">
              <span className="trial-item__day">{session.dayLabel}</span>
              <span>{session.time}</span>
            </div>
            <div>
              <p className="trial-item__name">{session.leadName}</p>
              <p className="trial-item__meta">
                {session.program} · {session.trainer}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )
}
