import type { Lead } from '../../types'
import { AiScoreBadge } from '../ui/AiScoreBadge'
import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'

interface LeadTableProps {
  leads: Lead[]
  title?: string
  subtitle?: string
  emptyMessage?: string
}

export function LeadTable({
  leads,
  title = 'Leads',
  subtitle,
  emptyMessage = 'No leads found.',
}: LeadTableProps) {
  return (
    <Card
      title={title}
      subtitle={subtitle ?? `${leads.length} active prospects`}
      flush
    >
      <div className="lead-table-wrap">
        {leads.length === 0 ? (
          <p className="empty-state">{emptyMessage}</p>
        ) : (
          <table className="lead-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Fitness Goal</th>
                <th>Interested Program</th>
                <th>Lead Source</th>
                <th>AI Score</th>
                <th>Status</th>
                <th>Next Action</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td>
                    <span className="lead-table__name">{lead.name}</span>
                  </td>
                  <td>{lead.email}</td>
                  <td>{lead.phone}</td>
                  <td>{lead.fitnessGoal}</td>
                  <td>{lead.interestedProgram}</td>
                  <td>{lead.leadSource}</td>
                  <td>
                    <AiScoreBadge score={lead.aiScore} />
                  </td>
                  <td>
                    <Badge status={lead.status} />
                  </td>
                  <td className="lead-table__action">{lead.nextAction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Card>
  )
}
