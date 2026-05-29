import { useApp } from '../context/AppContext'
import { Card } from '../components/ui/Card'
import type { AppSettings } from '../types'

export function SettingsPage() {
  const { settings, updateSettings } = useApp()

  const patchProfile = (patch: Partial<AppSettings['profile']>) => {
    updateSettings({
      ...settings,
      profile: { ...settings.profile, ...patch },
    })
  }

  const patchNotifications = (
    patch: Partial<AppSettings['notifications']>,
  ) => {
    updateSettings({
      ...settings,
      notifications: { ...settings.notifications, ...patch },
    })
  }

  const patchAiScoring = (patch: Partial<AppSettings['aiScoring']>) => {
    updateSettings({
      ...settings,
      aiScoring: { ...settings.aiScoring, ...patch },
    })
  }

  return (
    <div className="page settings-page">
      <Card title="Business Profile" subtitle="Clinic / gym information">
        <div className="settings-form">
          <label className="form-field">
            <span className="form-field__label">Business Name</span>
            <input
              type="text"
              value={settings.profile.businessName}
              onChange={(e) => patchProfile({ businessName: e.target.value })}
            />
          </label>
          <label className="form-field">
            <span className="form-field__label">Email</span>
            <input
              type="email"
              value={settings.profile.email}
              onChange={(e) => patchProfile({ email: e.target.value })}
            />
          </label>
          <label className="form-field">
            <span className="form-field__label">Phone</span>
            <input
              type="tel"
              value={settings.profile.phone}
              onChange={(e) => patchProfile({ phone: e.target.value })}
            />
          </label>
          <label className="form-field form-field--full">
            <span className="form-field__label">Address</span>
            <input
              type="text"
              value={settings.profile.address}
              onChange={(e) => patchProfile({ address: e.target.value })}
            />
          </label>
          <label className="form-field">
            <span className="form-field__label">Timezone</span>
            <select
              value={settings.profile.timezone}
              onChange={(e) => patchProfile({ timezone: e.target.value })}
            >
              <option value="America/Chicago">America/Chicago</option>
              <option value="America/New_York">America/New_York</option>
              <option value="America/Los_Angeles">America/Los_Angeles</option>
              <option value="America/Denver">America/Denver</option>
            </select>
          </label>
        </div>
      </Card>

      <Card title="Notification Settings" subtitle="Alerts and digests">
        <div className="settings-toggles">
          <label className="toggle-row">
            <span>New lead alerts</span>
            <input
              type="checkbox"
              checked={settings.notifications.newLeadAlerts}
              onChange={(e) =>
                patchNotifications({ newLeadAlerts: e.target.checked })
              }
            />
          </label>
          <label className="toggle-row">
            <span>Trial session reminders</span>
            <input
              type="checkbox"
              checked={settings.notifications.trialReminders}
              onChange={(e) =>
                patchNotifications({ trialReminders: e.target.checked })
              }
            />
          </label>
          <label className="toggle-row">
            <span>Hot lead alerts</span>
            <input
              type="checkbox"
              checked={settings.notifications.hotLeadAlerts}
              onChange={(e) =>
                patchNotifications({ hotLeadAlerts: e.target.checked })
              }
            />
          </label>
          <label className="toggle-row">
            <span>Weekly digest email</span>
            <input
              type="checkbox"
              checked={settings.notifications.weeklyDigest}
              onChange={(e) =>
                patchNotifications({ weeklyDigest: e.target.checked })
              }
            />
          </label>
        </div>
      </Card>

      <Card title="AI Scoring Settings" subtitle="Lead prioritization rules">
        <div className="settings-form">
          <label className="form-field">
            <span className="form-field__label">Hot threshold (score)</span>
            <input
              type="number"
              min={0}
              max={100}
              value={settings.aiScoring.hotThreshold}
              onChange={(e) =>
                patchAiScoring({ hotThreshold: Number(e.target.value) })
              }
            />
          </label>
          <label className="form-field">
            <span className="form-field__label">Warm threshold (score)</span>
            <input
              type="number"
              min={0}
              max={100}
              value={settings.aiScoring.warmThreshold}
              onChange={(e) =>
                patchAiScoring({ warmThreshold: Number(e.target.value) })
              }
            />
          </label>
          <label className="toggle-row toggle-row--inline">
            <span>Auto-prioritize hot leads</span>
            <input
              type="checkbox"
              checked={settings.aiScoring.autoPrioritize}
              onChange={(e) =>
                patchAiScoring({ autoPrioritize: e.target.checked })
              }
            />
          </label>
          <label className="toggle-row toggle-row--inline">
            <span>Include engagement signals</span>
            <input
              type="checkbox"
              checked={settings.aiScoring.includeEngagement}
              onChange={(e) =>
                patchAiScoring({ includeEngagement: e.target.checked })
              }
            />
          </label>
        </div>
      </Card>
    </div>
  )
}
