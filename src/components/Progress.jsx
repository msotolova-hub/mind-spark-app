import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { ScoreBadge } from './Players'

export default function Progress({ session }) {
  const [rows, setRows] = useState(null)

  useEffect(() => {
    supabase.from('responses').select('*')
      .eq('user_id', session.user.id).not('ai_score', 'is', null)
      .order('created_at', { ascending: false })
      .then(({ data }) => setRows(data || []))
  }, [session])

  if (rows === null) return <p style={{ color: 'var(--ink-soft)' }}>Načítám…</p>

  if (rows.length === 0) {
    return (
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <h2 style={{ fontSize: 26, margin: '0 0 6px' }}>Můj pokrok</h2>
        <div className="glass" style={{ borderRadius: 16, padding: '1.1rem 1.25rem', marginTop: 12 }}>
          Zatím tu nejsou žádná data. Projdi nějaké kazuistiky, transkripty nebo konceptualizace a tvoje výsledky se tu objeví.
        </div>
      </div>
    )
  }

  const overall = Math.round((rows.reduce((s, r) => s + r.ai_score, 0) / rows.length) * 10) / 10

  // agregace podle oblasti
  const bySkill = {}
  for (const r of rows) {
    const k = r.skill_area || 'Ostatní'
    ;(bySkill[k] ||= []).push(r.ai_score)
  }
  const skills = Object.entries(bySkill)
    .map(([name, arr]) => ({ name, avg: arr.reduce((a, b) => a + b, 0) / arr.length, n: arr.length }))
    .sort((a, b) => b.avg - a.avg)

  return (
    <div style={{ maxWidth: 820, margin: '0 auto' }}>
      <h2 style={{ fontSize: 26, margin: '0 0 6px' }}>Můj pokrok</h2>
      <p style={{ color: 'var(--ink-soft)', marginTop: 0, fontSize: 15 }}>
        Přehled tvých hodnocení napříč moduly — {rows.length} odpovědí, celkový průměr {overall}/10.
      </p>

      <div className="glass" style={{ borderRadius: 18, padding: '1.5rem', marginTop: 16 }}>
        <h3 style={{ margin: '0 0 14px', fontSize: 18 }}>Silné a slabé stránky</h3>
        <div style={{ display: 'grid', gap: 12 }}>
          {skills.map((s) => {
            const pct = Math.round((s.avg / 10) * 100)
            const color = s.avg >= 8 ? '#a9f0c5' : s.avg >= 5 ? 'var(--spark)' : '#ff9d9d'
            return (
              <div key={s.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 4 }}>
                  <span>{s.name} <span style={{ color: 'var(--ink-soft)', fontSize: 12 }}>({s.n})</span></span>
                  <span style={{ color }}>{Math.round(s.avg * 10) / 10}/10</span>
                </div>
                <div style={{ height: 8, borderRadius: 999, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                  <div style={{ width: pct + '%', height: '100%', background: color, borderRadius: 999 }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="glass" style={{ borderRadius: 18, padding: '1.5rem', marginTop: 16 }}>
        <h3 style={{ margin: '0 0 14px', fontSize: 18 }}>Historie odpovědí</h3>
        <div style={{ display: 'grid', gap: 10 }}>
          {rows.slice(0, 20).map((r) => (
            <div key={r.id} style={{ display: 'flex', gap: 12, alignItems: 'flex-start',
              borderTop: '1px solid var(--glass-border)', paddingTop: 10 }}>
              <ScoreBadge score={r.ai_score} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: 'var(--spark)' }}>{r.skill_area}</div>
                <div style={{ fontSize: 13.5, color: 'var(--ink-soft)', marginTop: 2 }}>{r.question_ref}</div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--ink-soft)', whiteSpace: 'nowrap' }}>
                {new Date(r.created_at).toLocaleDateString('cs')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
