import { analyticsData } from '../data/mockData'
import { Card } from '../components/ui/Card'
import { ConversionRateChart } from '../components/charts/ConversionRateChart'
import { ProgramInterestChart } from '../components/charts/ProgramInterestChart'

export function AnalyticsPage() {
  const {
    conversionRate,
    conversionDelta,
    conversionTrend,
    leadSources,
    programInterest,
  } = analyticsData

  return (
    <div className="page">
      <div className="analytics-grid analytics-grid--charts">
        <Card
          className="analytics-chart-card analytics-chart-card--wide"
          title="Conversion Rate"
          subtitle="Lead-to-member conversion · last 6 months"
        >
          <ConversionRateChart
            rate={conversionRate}
            delta={conversionDelta}
            trend={conversionTrend}
          />
        </Card>

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

        <Card
          className="analytics-chart-card"
          title="Program Interest"
          subtitle="Lead demand by program"
        >
          <ProgramInterestChart data={programInterest} />
        </Card>
      </div>
    </div>
  )
}
