const STYLES = {
  책: 'bg-blue-50 text-blue-600',
  영화: 'bg-purple-50 text-purple-600',
}

function TypeBadge({ type }) {
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-xs font-medium ${STYLES[type] ?? 'bg-neutral-100 text-neutral-600'}`}
    >
      {type}
    </span>
  )
}

export default TypeBadge
