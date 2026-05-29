import type { DashboardKpis, Lead, LeadFormData, LeadStatus } from '../types'

export function isHotLead(lead: Lead): boolean {
  return lead.status === 'hot' || lead.aiScore >= 80
}

export function computeAiScore(status: LeadStatus): number {
  const base: Record<LeadStatus, number> = {
    hot: 88,
    trial_booked: 75,
    contacted: 62,
    nurturing: 48,
    new: 55,
  }
  return base[status] + Math.floor(Math.random() * 8)
}

export function defaultNextAction(status: LeadStatus): string {
  const actions: Record<LeadStatus, string> = {
    new: 'Send welcome email',
    contacted: 'Schedule follow-up call',
    trial_booked: 'Confirm trial attendance',
    hot: 'Call within 2 hours',
    nurturing: 'Add to nurture sequence',
  }
  return actions[status]
}

export function buildKpis(
  leads: Lead[],
  trialCount: number,
): DashboardKpis {
  const hotCount = leads.filter(isHotLead).length
  return {
    totalLeads: {
      label: 'Total Leads',
      value: leads.length,
      delta: '+12% vs last month',
      deltaType: 'positive',
    },
    hotLeads: {
      label: 'Hot Leads',
      value: hotCount,
      delta: '+3 this week',
      deltaType: 'positive',
    },
    trialSessions: {
      label: 'Trial Sessions Booked',
      value: trialCount,
      delta: '2 scheduled today',
      deltaType: 'neutral',
    },
    monthlyRevenue: {
      label: 'Monthly Membership Revenue',
      value: '$48,250',
      delta: '+8.4% vs last month',
      deltaType: 'positive',
    },
  }
}

export function createLeadFromForm(data: LeadFormData): Lead {
  const aiScore = computeAiScore(data.status)
  return {
    id: `lead-${Date.now()}`,
    ...data,
    aiScore,
    nextAction: defaultNextAction(data.status),
  }
}
