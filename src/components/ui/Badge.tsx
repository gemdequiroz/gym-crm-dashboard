import type { LeadStatus } from '../../types'

const statusLabels: Record<LeadStatus, string> = {
  new: 'New',
  contacted: 'Contacted',
  trial_booked: 'Trial Booked',
  hot: 'Hot',
  nurturing: 'Nurturing',
}

interface BadgeProps {
  status: LeadStatus
}

export function Badge({ status }: BadgeProps) {
  return (
    <span className={`badge badge--${status}`}>{statusLabels[status]}</span>
  )
}
