import { useState } from 'react'
import { ImageOff } from 'lucide-react'

function CoverImage({ src, alt, className = '' }) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div
        className={`flex items-center justify-center bg-neutral-100 text-neutral-400 ${className}`}
      >
        <ImageOff size={28} strokeWidth={1.5} />
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  )
}

export default CoverImage
