import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import Upload from './Upload'
import ModuleView from './ModuleView'
import Progress from './Progress'

const MODULES = [
  { n: '01', view: 'clinical_story', title: 'Klinické příběhy',
    desc: 'Přečti kazuistiku a odpověz na diagnostické otázky. AI ti odpovědi vyhodnotí.' },
  { n: '02', view: 'interview_trainer', title: 'Trenažér rozhovoru',
    desc: 'Transkript se zastaví, ty napíšeš reakci terapeuta. AI ji oznámkuje a poradí, co zlepšit.' },
  { n: '03', view: 'conceptualization', title: 'KBT konceptualizace',
    desc: 'Poskládej případ: predispozice → jádrová přesvědčení → pravidla → spouštěč → bludný kruh.' },
  { n: '04', view: 'tool', title: 'Knihovna nástrojů',
    desc: 'Záznam myšlenek, behaviorální experimenty, expozice — formuláře podle tvé nahrané látky.' },
  { n: '05', view: 'guide', title: 'Průvodce praxí',
    desc: 'Edukační materiály a struktura sezení poskládané z tvých poznámek.' },
  { n: '06', view: 'progress', title: 'Můj pokrok',
    desc: 'Grafy úspěšnosti, tvoje silné a slabé stránky a historie odpovědí.' },
]

const MODULE_TYPES = ['clinical_story', 'interview_trainer', 'conceptualization', 'tool', 'guide']

export default function Dashboard({ session }) {
  const [name, setName] = useState('')
  const [view, setView] = useState('home')
  const [hasMaterials, setHasMaterials] = useState(null)

  useEffect(() => {
    supabase.from('profiles').select('full_name').eq('id', session.user.id).maybeSingle()
      .then(({ data }) => setName(data?.full_name || session.user.email?.split('@')[0] || ''))
  }, [session])

  useEffect(() => {
    if (view !== 'home') return
    supabase.from('materials').select('id', { count: 'exact', head: true }).eq('user_id', session.user.id)
      .then(({ count }) => setHasMaterials((count || 0) > 0))
  }, [session, view])

  const back = <button className="link" onClick={() => setView('home')} style={{ fontSize: 14, marginBottom: 16 }}>← Zpět na přehled</button>

  return (
    <div style={{ maxWidth: 1080, margin: '0 auto', padding: '1.5rem 1.25rem 4rem' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.4rem 0 1.6rem' }}>
        <button className="link" style={{ display: 'flex', alignItems: 'center', gap: 10 }} onClick={() => setView('home')}>
          <Spark />
          <span style={{ fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-soft)' }}>
            Mind Spark · KBT Masterclass</span>
        </button>
        <button className="link" style={{ fontSize: 14 }} onClick={() => supabase.auth.signOut()}>Odhlásit se</button>
      </header>

      {view === 'home' && (
        <>
          <h1 style={{ fontSize: 34, margin: '0 0 6px', lineHeight: 1.12 }}>
            Vítej{name ? ', ' : ''}<span className="spark-text">{name}</span>
          </h1>
          <p style={{ color: 'var(--ink-soft)', marginTop: 0, maxWidth: 620, fontSize: 16 }}>
            Tvůj tréninkový prostor pro KBT výcvik. Vyber si modul a procvičuj — každou tvou odpověď
            AI zhodnotí a zaznamená, aby ses viděla zlepšovat.
          </p>

          <div style={{ display: 'flex', gap: 12, alignItems: 'center', margin: '1.5rem 0 2rem', flexWrap: 'wrap' }}>
            <button className="btn-spark" onClick={() => setView('upload')}>Nahrát materiál</button>
            {hasMaterials === false && <span style={{ color: 'var(--ink-soft)', fontSize: 14 }}>
              Zatím nemáš žádné materiály — začni nahráním poznámek.</span>}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {MODULES.map((m) => (
              <button key={m.n} className="glass card-int" onClick={() => setView(m.view)}
                style={{ textAlign: 'left', borderRadius: 18, padding: '1.25rem', cursor: 'pointer',
                  display: 'flex', flexDirection: 'column', gap: 8, minHeight: 170, color: 'inherit' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span className="display" style={{ fontSize: 13, color: 'var(--ink-soft)' }}>{m.n}</span>
                  <span style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase',
                    color: 'var(--spark)', border: '1px solid var(--glass-border)', borderRadius: 999, padding: '2px 8px' }}>
                    Aktivní</span>
                </div>
                <h3 style={{ margin: 0, fontSize: 19 }}>{m.title}</h3>
                <p style={{ margin: 0, fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.5 }}>{m.desc}</p>
              </button>
            ))}
          </div>
        </>
      )}

      {view === 'upload' && <>{back}<Upload session={session} onDone={() => setView('home')} /></>}
      {view === 'progress' && <>{back}<Progress session={session} /></>}
      {MODULE_TYPES.includes(view) && <>{back}<ModuleView session={session} type={view} /></>}
    </div>
  )
}

function Spark() {
  return (
    <svg width="20" height="20" viewBox="0 0 32 32" aria-hidden="true">
      <defs><linearGradient id="sd" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#f6c453" /><stop offset="1" stopColor="#c77dff" /></linearGradient></defs>
      <path fill="url(#sd)" d="M16 2l2.6 8.4L27 13l-8.4 2.6L16 24l-2.6-8.4L5 13l8.4-2.6z" />
    </svg>
  )
}
