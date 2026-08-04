import { BIO, ENGINEERING_BULLETS, MOTION_BULLETS } from '@/lib/data'

export default function AboutContent() {
  return (
    <div className="bg-white">
      <div className="flex gap-3 border-b border-black/20 px-2 py-1 text-[12px] bg-[var(--button-face)]">
        <span>File</span>
        <span>Edit</span>
        <span>Search</span>
        <span>Help</span>
      </div>
      <div className="p-3 font-mono text-[13px] leading-relaxed whitespace-pre-wrap">
        <p>{BIO}</p>
        <p className="mt-3 font-bold">WHAT I BUILD</p>
        <p className="mt-1 font-bold text-black/70">— Site engineering —</p>
        <ul>
          {ENGINEERING_BULLETS.map((line) => (
            <li key={line}>- {line}</li>
          ))}
        </ul>
        <p className="mt-2 font-bold text-black/70">— Motion & polish —</p>
        <ul>
          {MOTION_BULLETS.map((line) => (
            <li key={line}>- {line}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
