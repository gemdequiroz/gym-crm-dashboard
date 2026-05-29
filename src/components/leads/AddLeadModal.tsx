import { useState, type FormEvent } from 'react'
import { X } from 'lucide-react'
import {
  fitnessGoals,
  leadSourceOptions,
  programOptions,
  statusOptions,
} from '../../data/mockData'
import { useApp } from '../../context/AppContext'
import type { LeadFormData, LeadStatus } from '../../types'

const emptyForm: LeadFormData = {
  name: '',
  email: '',
  phone: '',
  fitnessGoal: fitnessGoals[0],
  interestedProgram: programOptions[0],
  leadSource: leadSourceOptions[0],
  status: 'new',
}

export function AddLeadModal() {
  const { isAddLeadOpen, closeAddLead, addLead } = useApp()
  const [form, setForm] = useState<LeadFormData>(emptyForm)

  if (!isAddLeadOpen) return null

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim()) return
    addLead(form)
    setForm(emptyForm)
  }

  const handleClose = () => {
    setForm(emptyForm)
    closeAddLead()
  }

  const update = <K extends keyof LeadFormData>(key: K, value: LeadFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="modal-overlay" role="presentation" onClick={handleClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-lead-title"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="modal__header">
          <h2 id="add-lead-title" className="modal__title">
            Add Lead
          </h2>
          <button
            type="button"
            className="modal__close"
            onClick={handleClose}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </header>

        <form className="modal__form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <label className="form-field">
              <span className="form-field__label">Name *</span>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                placeholder="Full name"
              />
            </label>
            <label className="form-field">
              <span className="form-field__label">Email *</span>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                placeholder="email@example.com"
              />
            </label>
            <label className="form-field">
              <span className="form-field__label">Phone</span>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                placeholder="(555) 000-0000"
              />
            </label>
            <label className="form-field">
              <span className="form-field__label">Fitness Goal</span>
              <select
                value={form.fitnessGoal}
                onChange={(e) => update('fitnessGoal', e.target.value)}
              >
                {fitnessGoals.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </label>
            <label className="form-field">
              <span className="form-field__label">Interested Program</span>
              <select
                value={form.interestedProgram}
                onChange={(e) => update('interestedProgram', e.target.value)}
              >
                {programOptions.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </label>
            <label className="form-field">
              <span className="form-field__label">Lead Source</span>
              <select
                value={form.leadSource}
                onChange={(e) => update('leadSource', e.target.value)}
              >
                {leadSourceOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
            <label className="form-field form-field--full">
              <span className="form-field__label">Status</span>
              <select
                value={form.status}
                onChange={(e) =>
                  update('status', e.target.value as LeadStatus)
                }
              >
                {statusOptions.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <footer className="modal__footer">
            <button type="button" className="btn btn--ghost" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn--primary">
              Add Lead
            </button>
          </footer>
        </form>
      </div>
    </div>
  )
}
