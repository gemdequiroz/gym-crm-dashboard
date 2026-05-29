export type PageId =
  | 'dashboard'
  | 'leads'
  | 'programs'
  | 'analytics'
  | 'settings'

export type LeadStatus =
  | 'new'
  | 'contacted'
  | 'trial_booked'
  | 'hot'
  | 'nurturing'

export interface Lead {
  id: string
  name: string
  email: string
  phone: string
  fitnessGoal: string
  interestedProgram: string
  leadSource: string
  aiScore: number
  status: LeadStatus
  nextAction: string
}

export interface LeadFormData {
  name: string
  email: string
  phone: string
  fitnessGoal: string
  interestedProgram: string
  leadSource: string
  status: LeadStatus
}

export interface KpiMetric {
  label: string
  value: string | number
  delta: string
  deltaType?: 'positive' | 'neutral'
}

export type RecommendationPriority = 'high' | 'medium' | 'low'

export interface AiRecommendation {
  id: string
  priority: RecommendationPriority
  title: string
  body: string
  leadName?: string
}

export interface TrialSession {
  id: string
  leadName: string
  program: string
  trainer: string
  date: string
  time: string
  dayLabel: string
}

export interface ProgramInterest {
  program: string
  count: number
  percentage: number
}

export interface DashboardKpis {
  totalLeads: KpiMetric
  hotLeads: KpiMetric
  trialSessions: KpiMetric
  monthlyRevenue: KpiMetric
}

export interface GymProgram {
  id: string
  name: string
  description: string
  duration: string
  level: string
  activeMembers: number
  price: string
}

export interface LeadSourceStat {
  source: string
  count: number
  percentage: number
}

export interface AnalyticsData {
  conversionRate: number
  conversionDelta: string
  leadSources: LeadSourceStat[]
  programInterest: ProgramInterest[]
}

export interface BusinessProfile {
  businessName: string
  email: string
  phone: string
  address: string
  timezone: string
}

export interface NotificationSettings {
  newLeadAlerts: boolean
  trialReminders: boolean
  hotLeadAlerts: boolean
  weeklyDigest: boolean
}

export interface AiScoringSettings {
  hotThreshold: number
  warmThreshold: number
  autoPrioritize: boolean
  includeEngagement: boolean
}

export interface AppSettings {
  profile: BusinessProfile
  notifications: NotificationSettings
  aiScoring: AiScoringSettings
}
