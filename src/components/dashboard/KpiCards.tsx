import { Calendar, DollarSign, Flame, Users } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import type { DashboardKpis } from '../../types'

const kpiConfig: {
  key: keyof DashboardKpis
  icon: typeof Users
  iconClass?: string
}[] = [
  { key: 'totalLeads', icon: Users },
  { key: 'hotLeads', icon: Flame, iconClass: 'kpi-card__icon--hot' },
  { key: 'trialSessions', icon: Calendar },
  { key: 'monthlyRevenue', icon: DollarSign, iconClass: 'kpi-card__icon--revenue' },
]

export function KpiCards() {
  const { kpis } = useApp()

  return (
    <section className="dashboard__kpis" aria-label="Key performance indicators">
      {kpiConfig.map(({ key, icon: Icon, iconClass }) => {
        const kpi = kpis[key]
        return (
          <article key={key} className="card kpi-card">
            <div className="kpi-card__top">
              <div>
                <p className="kpi-card__label">{kpi.label}</p>
                <p className="kpi-card__value">{kpi.value}</p>
              </div>
              <div className={`kpi-card__icon${iconClass ? ` ${iconClass}` : ''}`}>
                <Icon size={20} aria-hidden />
              </div>
            </div>
            <p
              className={`kpi-card__delta${kpi.deltaType === 'neutral' ? ' kpi-card__delta--neutral' : ''}`}
            >
              {kpi.delta}
            </p>
          </article>
        )
      })}
    </section>
  )
}
