import { TrendingUp } from 'lucide-react'
import { analyticsData } from '../data/mockData'
import { Card } from '../components/ui/Card'

export function AnalyticsPage() {
  const { conversionRate, conversionDelta, leadSources, programInterest } =
    analyticsData

  return (
    <div className="page">
      <div className="analytics-grid">
        <article className="card stat-card stat-card--highlight">
          <div className="stat-card__body">
            <div className="stat-card__icon">
              <TrendingUp size={24} aria-hidden />
            </div>
            <div>
              <p className="stat-card__label">Conversion Rate</p>
              <p className="stat-card__value">{conversionRate}%</p>
              <p className="stat-card__delta">{conversionDelta}</p>
            </div>
          </div>
        </article>

        <Card title="Lead Sources" subtitle="Where your leads come from">
          <div className="program-bars">
            {leadSources.map((item) => (
              <div key={item.source} className="program-bar">
                <div className="program-bar__header">
                  <span className="program-bar__label">{item.source}</span>
                  <span className="program-bar__count">
                    {item.count} · {item.percentage}%
                  </span>
                </div>
                <div className="program-bar__track">
                  <div
                    className="program-bar__fill program-bar__fill--source"
                    style={{ width: `${item.percentage}%` }}
                    role="progressbar"
                    aria-valuenow={item.percentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${item.source} leads`}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Program Interest" subtitle="Lead demand by program">
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
      </div>
    </div>
  )
}
