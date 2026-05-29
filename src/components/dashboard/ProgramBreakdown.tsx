import { analyticsData } from '../../data/mockData'

const { programInterest } = analyticsData
import { Card } from '../ui/Card'

export function ProgramBreakdown() {
  return (
    <Card title="Program Interest Breakdown" subtitle="Lead demand by program">
      <div className="program-bars">
        {programInterest.map((item) => (
          <div key={item.program} className="program-bar">
            <div className="program-bar__header">
              <span className="program-bar__label">{item.program}</span>
              <span className="program-bar__count">
                {item.count} leads · {item.percentage}%
              </span>
            </div>
            <div className="program-bar__track">
              <div
                className="program-bar__fill"
                style={{ width: `${item.percentage}%` }}
                role="progressbar"
                aria-valuenow={item.percentage}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${item.program} interest`}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
