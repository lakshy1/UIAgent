import type { Device } from '../types'

export const meta = {
  id: 'aurora-background',
  title: 'Aurora background',
  category: 'Backgrounds',
  description: 'Slow drifting aurora ribbons behind a hero headline. Pure CSS, no canvas.',
  source: ['Web: Aceternity aurora pattern', '10-aconic-technologies'],
  tags: ['hero', 'gradient', 'ambient'],
  notes: ['Animation stops under prefers-reduced-motion.', 'Decorative layers are aria-hidden.'],
} as const

export default function AuroraBackground({ device }: { device: Device }) {
  const m = device === 'mobile'
  return (
    <div className="relative h-full w-full overflow-hidden bg-bg">
      <style>{`@keyframes kc-aurora{0%{background-position:0% 50%}100%{background-position:200% 50%}}
      @media (prefers-reduced-motion:reduce){.kc-aurora{animation:none!important}}`}</style>
      <div aria-hidden className="kc-aurora absolute -inset-[20%] opacity-50 blur-3xl"
        style={{ backgroundImage: 'repeating-linear-gradient(100deg, var(--color-brand) 10%, var(--color-spark) 20%, var(--color-brand-soft) 30%, var(--color-brand) 40%)', backgroundSize: '200% 100%', animation: 'kc-aurora 14s linear infinite' }} />
      <div className="relative grid h-full place-items-center px-6 text-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted">Northern lights</p>
          <h2 className={`mt-2 font-display font-semibold text-ink ${m ? 'text-3xl' : 'text-5xl'}`}>Calm, moving color</h2>
          <button className="mt-5 h-11 rounded-full bg-ink px-6 text-sm font-medium text-bg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">Get started</button>
        </div>
      </div>
    </div>
  )
}
