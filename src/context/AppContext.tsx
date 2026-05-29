import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { initialLeads, trialSessions, defaultSettings } from '../data/mockData'
import type {
  AppSettings,
  Lead,
  LeadFormData,
  PageId,
} from '../types'
import { buildKpis, createLeadFromForm } from '../utils/leads'
import { applyTheme, getStoredTheme, type Theme } from '../utils/theme'

interface AppContextValue {
  page: PageId
  setPage: (page: PageId) => void
  leads: Lead[]
  addLead: (data: LeadFormData) => void
  kpis: ReturnType<typeof buildKpis>
  isAddLeadOpen: boolean
  openAddLead: () => void
  closeAddLead: () => void
  settings: AppSettings
  updateSettings: (settings: AppSettings) => void
  theme: Theme
  toggleTheme: () => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<PageId>('dashboard')
  const [leads, setLeads] = useState<Lead[]>(initialLeads)
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false)
  const [settings, setSettings] = useState<AppSettings>(defaultSettings)
  const [theme, setTheme] = useState<Theme>(getStoredTheme)

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  const kpis = useMemo(
    () => buildKpis(leads, trialSessions.length),
    [leads],
  )

  const addLead = useCallback((data: LeadFormData) => {
    setLeads((prev) => [createLeadFromForm(data), ...prev])
    setIsAddLeadOpen(false)
  }, [])

  const openAddLead = useCallback(() => setIsAddLeadOpen(true), [])
  const closeAddLead = useCallback(() => setIsAddLeadOpen(false), [])
  const updateSettings = useCallback((next: AppSettings) => setSettings(next), [])

  const value = useMemo(
    () => ({
      page,
      setPage,
      leads,
      addLead,
      kpis,
      isAddLeadOpen,
      openAddLead,
      closeAddLead,
      settings,
      updateSettings,
      theme,
      toggleTheme,
    }),
    [
      page,
      leads,
      addLead,
      kpis,
      isAddLeadOpen,
      openAddLead,
      closeAddLead,
      settings,
      updateSettings,
      theme,
      toggleTheme,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
