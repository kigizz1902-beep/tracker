import { Star } from 'lucide-react'

const RATING_MAX = 5

function StarRating({ rating, onChange }) {
  const interactive = typeof onChange === 'function'

  return (
    <div className="flex gap-0.5">
      {Array.from({ length: RATING_MAX }, (_, i) => i + 1).map((value) => {
        const filled = value <= rating
        const star = (
          <Star
            key={value}
            size={interactive ? 22 : 16}
            className={filled ? 'text-amber-400' : 'text-neutral-300'}
            fill={filled ? 'currentColor' : 'none'}
          />
        )

        if (!interactive) return star

        return (
          <button
            key={value}
            type="button"
            aria-label={`${value}점`}
            onClick={() => onChange(value)}
            className="cursor-pointer"
          >
            {star}
          </button>
        )
      })}
    </div>
  )
}

export default StarRating
