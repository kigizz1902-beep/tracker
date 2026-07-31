import { LibraryBig } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-white text-neutral-800">
      <LibraryBig className="size-10 text-purple-600" strokeWidth={1.5} />
      <h1 className="text-xl font-medium">독서·영화 기록 트래커</h1>
      <p className="text-sm text-neutral-500">Vite + React + Tailwind CSS 뼈대 준비 완료</p>
    </div>
  )
}

export default App
