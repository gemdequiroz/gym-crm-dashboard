import type { ReactNode } from 'react'

interface CardProps {
  title?: string
  subtitle?: string
  action?: ReactNode
  children: ReactNode
  flush?: boolean
  className?: string
}

export function Card({
  title,
  subtitle,
  action,
  children,
  flush = false,
  className = '',
}: CardProps) {
  return (
    <section className={`card ${className}`.trim()}>
      {(title || action) && (
        <header className="card__header">
          <div>
            {title && <h2 className="card__title">{title}</h2>}
            {subtitle && <p className="card__subtitle">{subtitle}</p>}
          </div>
          {action}
        </header>
      )}
      <div className={flush ? 'card__body card__body--flush' : 'card__body'}>
        {children}
      </div>
    </section>
  )
}
