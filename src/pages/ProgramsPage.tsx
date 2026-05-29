import { Clock, Users } from 'lucide-react'
import { gymPrograms } from '../data/mockData'
export function ProgramsPage() {
  return (
    <div className="page">
      <p className="page-intro">
        Manage and view your gym&apos;s active programs and membership tiers.
      </p>
      <div className="programs-grid">
        {gymPrograms.map((program) => (
          <article key={program.id} className="card program-card">
            <div className="program-card__body">
              <div className="program-card__header">
                <h3 className="program-card__name">{program.name}</h3>
                <span className="program-card__price">{program.price}</span>
              </div>
              <p className="program-card__desc">{program.description}</p>
              <div className="program-card__meta">
                <span>
                  <Clock size={14} aria-hidden />
                  {program.duration}
                </span>
                <span>{program.level}</span>
                <span>
                  <Users size={14} aria-hidden />
                  {program.activeMembers} members
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
