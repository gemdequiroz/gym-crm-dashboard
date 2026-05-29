import { Search } from 'lucide-react'

interface LeadSearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function LeadSearchBar({ value, onChange }: LeadSearchBarProps) {
  return (
    <div className="search-input lead-search">
      <Search size={18} aria-hidden />
      <input
        type="search"
        className="lead-search__input"
        placeholder="Search by name or email..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search leads by name or email"
        autoComplete="off"
        spellCheck={false}
      />
    </div>
  )
}
