import { useState } from 'react'
import { supabase } from '../supabaseClient'
import { evaluateAnswers } from '../lib/ai'

// ---------- sdílené prvky ----------
export function ScoreBadge({ score }) {
  const color = score >= 8 ? '#a9f0c5' : score >= 5 ? 'var(--spark)' : '#ff9d9d'
  return (
    <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 18, fontWeight: 600,
      color, border: '1px solid ' + color, borderRadius: 999, padding: '2px 12px' }}>
      {score}/10
    </span>
  )
}

function Evaluation({ ev }) {
  if (!ev) return null
  return (
    <div style={{ marginTop: 12, borderTop: '1px solid var(--glass-border)', paddingTop: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
        <ScoreBadge score={ev.score} />
        <span style={{ fontSize: 14, color: 'var(--ink-soft)' }}>hodnocení AI</span>
      </div>
      <p style={{ margin: '0 0 10px', fontSize: 14.5, lineHeight: 1.55 }}>{ev.feedback}</p>
      {ev.model_answer && (
        <div style={{ margin: '0 0 10px', padding: '10px 12px', borderRadius: 10,
          background: 'rgba(169,240,197,0.06)', border: '1px solid rgba(169,240,197,0.25)' }}>
          <div style={{ fontSize: 12, color: '#a9f0c5', marginBottom: 4 }}>Vzorová odpověď</div>
          <div style={{ fontSize: 14, lineHeight: 1.55 }}>{ev.model_answer}</div>
        </div>
      )}
      {ev.strengths?.length > 0 && (
        <p style={{ margin: '0 0 6px', fontSize: 13.5 }}>
          <span style={{ color: '#a9f0c5' }}>Silné stránky: </span>{ev.strengths.join(' · ')}
        </p>
      )}
      {ev.improvements?.length > 0 && (
        <p style={{ margin: 0, fontSize: 13.5 }}>
          <span style={{ color: 'var(--spark)' }}>Ke zlepšení: </span>{ev.improvements.join(' · ')}
        </p>
      )}
    </div>
  )
}

function BackBtn({ onBack }) {
  return <button className="link" onClick={onBack} style={{ fontSize: 14, marginBottom: 14 }}>← Zpět na seznam</button>
}

// obecné uložení hodnocených odpovědí
async function saveResponses(session, moduleRow, evaluations, items) {
  const rows = evaluations.map((ev, i) => ({
    user_id: session.user.id,
    module_id: moduleRow.id,
    module_type: moduleRow.module_type,
    skill_area: items[i].skill_area,
    question_ref: items[i].question,
    user_response: items[i].user_answer,
    ai_score: ev.score,
    ai_feedback: ev.feedback,
    ai_strengths: ev.strengths,
    ai_improvements: ev.improvements,
  }))
  await supabase.from('responses').insert(rows)
}

function avg(results) {
  if (!results?.length) return 0
  return Math.round((results.reduce((s, r) => s + (r.score || 0), 0) / results.length) * 10) / 10
}

// ---------- 1) KAZUISTIKY ----------
export function StoryPlayer({ session, item, onBack }) {
  const c = item.content
  const questions = c?.diagnostic_questions || []
  const [answers, setAnswers] = useState(questions.map(() => ''))
  const [busy, setBusy] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)

  async function submit() {
    if (answers.some((a) => !a.trim())) return setError('Odpověz prosím na všechny otázky.')
    setError(null); setBusy(true)
    try {
      const items = questions.map((q, i) => ({
        question: q.question, skill_area: q.skill_area, ideal_points: q.ideal_points, user_answer: answers[i],
      }))
      const ev = await evaluateAnswers(c.case_text, items)
      await saveResponses(session, item, ev, items)
      setResults(ev)
    } catch (e) { setError(e.message) } finally { setBusy(false) }
  }

  return (
    <div style={{ maxWidth: 820, margin: '0 auto' }}>
      <BackBtn onBack={onBack} />
      <div className="glass" style={{ borderRadius: 18, padding: '1.5rem' }}>
        <div style={{ fontSize: 12, color: 'var(--ink-soft)' }}>{item.theme}</div>
        <h2 style={{ fontSize: 24, margin: '4px 0 14px' }}>{item.title}</h2>
        <p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6, margin: 0 }}>{c?.case_text}</p>
      </div>
      <div style={{ display: 'grid', gap: 18, marginTop: 20 }}>
        {questions.map((q, i) => (
          <div key={i} className="glass" style={{ borderRadius: 16, padding: '1.25rem' }}>
            <div style={{ fontSize: 12, color: 'var(--spark)', marginBottom: 6 }}>{q.skill_area}</div>
            <div style={{ fontSize: 16, marginBottom: 10 }}>{i + 1}. {q.question}</div>
            <textarea className="ta" rows={3} placeholder="Tvoje odpověď…" value={answers[i]} disabled={!!results}
              onChange={(e) => { const n = [...answers]; n[i] = e.target.value; setAnswers(n) }} />
            {results && <Evaluation ev={results[i]} />}
          </div>
        ))}
      </div>
      {error && <p style={{ color: '#ff9d9d', fontSize: 14, marginTop: 14 }}>{error}</p>}
      {!results
        ? <button className="btn-spark" onClick={submit} disabled={busy} style={{ marginTop: 18 }}>
            {busy ? 'Vyhodnocuji…' : 'Odeslat k vyhodnocení'}</button>
        : <p style={{ marginTop: 18, color: 'var(--ink-soft)', fontSize: 14 }}>Průměr: <strong style={{ color: 'var(--ink)' }}>{avg(results)}/10</strong></p>}
    </div>
  )
}

// ---------- 2) TRANSKRIPTY / ROZHOVOR ----------
export function InterviewPlayer({ session, item, onBack }) {
  const c = item.content
  const transcript = c?.transcript || []
  const [answer, setAnswer] = useState('')
  const [busy, setBusy] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  async function submit() {
    if (!answer.trim()) return setError('Napiš svou reakci terapeuta.')
    setError(null); setBusy(true)
    try {
      const caseText = `${c.situation}\n\n` + transcript.map((t) => `${t.speaker}: ${t.text}`).join('\n')
      const items = [{ question: 'Napiš reakci terapeuta na poslední repliku klienta.',
        skill_area: c.skill_area, ideal_points: c.ideal_points, user_answer: answer }]
      const ev = await evaluateAnswers(caseText, items)
      await saveResponses(session, item, ev, items)
      setResult(ev[0])
    } catch (e) { setError(e.message) } finally { setBusy(false) }
  }

  return (
    <div style={{ maxWidth: 820, margin: '0 auto' }}>
      <BackBtn onBack={onBack} />
      <div className="glass" style={{ borderRadius: 18, padding: '1.5rem' }}>
        <div style={{ fontSize: 12, color: 'var(--ink-soft)' }}>{item.theme}</div>
        <h2 style={{ fontSize: 24, margin: '4px 0 10px' }}>{item.title}</h2>
        <p style={{ color: 'var(--ink-soft)', margin: '0 0 16px', fontSize: 14 }}>{c?.situation}</p>
        <div style={{ display: 'grid', gap: 8 }}>
          {transcript.map((t, i) => {
            const ter = /terapeut/i.test(t.speaker)
            return (
              <div key={i} style={{ padding: '10px 12px', borderRadius: 12,
                background: ter ? 'rgba(246,196,83,0.08)' : 'rgba(255,255,255,0.05)',
                border: '1px solid var(--glass-border)' }}>
                <div style={{ fontSize: 11, color: ter ? 'var(--spark)' : 'var(--ink-soft)', marginBottom: 3 }}>{t.speaker}</div>
                <div style={{ fontSize: 14.5 }}>{t.text}</div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="glass" style={{ borderRadius: 16, padding: '1.25rem', marginTop: 18 }}>
        <div style={{ fontSize: 12, color: 'var(--spark)', marginBottom: 6 }}>{c?.skill_area} · tvoje reakce</div>
        <textarea className="ta" rows={4} placeholder="Co jako terapeut/ka řekneš?" value={answer} disabled={!!result}
          onChange={(e) => setAnswer(e.target.value)} />
        {result && <Evaluation ev={result} />}
      </div>
      {error && <p style={{ color: '#ff9d9d', fontSize: 14, marginTop: 14 }}>{error}</p>}
      {!result && <button className="btn-spark" onClick={submit} disabled={busy} style={{ marginTop: 18 }}>
        {busy ? 'Vyhodnocuji…' : 'Odeslat k vyhodnocení'}</button>}
    </div>
  )
}

// ---------- 3) KONCEPTUALIZACE ----------
export function ConceptPlayer({ session, item, onBack }) {
  const c = item.content
  const layers = c?.layers || []
  const [vals, setVals] = useState(layers.map(() => ''))
  const [busy, setBusy] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)

  async function submit() {
    if (vals.some((v) => !v.trim())) return setError('Vyplň prosím všechny vrstvy.')
    setError(null); setBusy(true)
    try {
      const items = layers.map((l, i) => ({
        question: `${l.label}: ${l.hint}`, skill_area: l.label, ideal_points: l.ideal_points, user_answer: vals[i],
      }))
      const ev = await evaluateAnswers(c.case_text, items)
      await saveResponses(session, item, ev, items)
      setResults(ev)
    } catch (e) { setError(e.message) } finally { setBusy(false) }
  }

  return (
    <div style={{ maxWidth: 820, margin: '0 auto' }}>
      <BackBtn onBack={onBack} />
      <div className="glass" style={{ borderRadius: 18, padding: '1.5rem' }}>
        <div style={{ fontSize: 12, color: 'var(--ink-soft)' }}>{item.theme}</div>
        <h2 style={{ fontSize: 24, margin: '4px 0 14px' }}>{item.title}</h2>
        <p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6, margin: 0 }}>{c?.case_text}</p>
      </div>
      <div style={{ display: 'grid', gap: 14, marginTop: 20 }}>
        {layers.map((l, i) => (
          <div key={i} className="glass" style={{ borderRadius: 16, padding: '1.15rem' }}>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 2 }}>{i + 1}. {l.label}</div>
            <div style={{ fontSize: 12.5, color: 'var(--ink-soft)', marginBottom: 10 }}>{l.hint}</div>
            <textarea className="ta" rows={2} placeholder="Tvoje formulace…" value={vals[i]} disabled={!!results}
              onChange={(e) => { const n = [...vals]; n[i] = e.target.value; setVals(n) }} />
            {results && <Evaluation ev={results[i]} />}
          </div>
        ))}
      </div>
      {error && <p style={{ color: '#ff9d9d', fontSize: 14, marginTop: 14 }}>{error}</p>}
      {!results
        ? <button className="btn-spark" onClick={submit} disabled={busy} style={{ marginTop: 18 }}>
            {busy ? 'Vyhodnocuji…' : 'Odeslat k vyhodnocení'}</button>
        : <p style={{ marginTop: 18, color: 'var(--ink-soft)', fontSize: 14 }}>Průměr: <strong style={{ color: 'var(--ink)' }}>{avg(results)}/10</strong></p>}
    </div>
  )
}

// ---------- 4) NÁSTROJE (formuláře) ----------
export function ToolPlayer({ session, item, onBack }) {
  const c = item.content
  const fields = c?.fields || []
  const [vals, setVals] = useState(fields.map(() => ''))
  const [saved, setSaved] = useState(false)
  const [busy, setBusy] = useState(false)

  async function save() {
    setBusy(true)
    try {
      const filled = fields.map((f, i) => ({ label: f.label, value: vals[i] }))
      await supabase.from('responses').insert({
        user_id: session.user.id, module_id: item.id, module_type: 'tool',
        skill_area: item.title, question_ref: item.title, user_response: JSON.stringify(filled),
      })
      setSaved(true)
    } finally { setBusy(false) }
  }

  return (
    <div style={{ maxWidth: 760, margin: '0 auto' }}>
      <BackBtn onBack={onBack} />
      <div className="glass" style={{ borderRadius: 18, padding: '1.5rem' }}>
        <div style={{ fontSize: 12, color: 'var(--ink-soft)' }}>{c?.tool_type || item.theme}</div>
        <h2 style={{ fontSize: 24, margin: '4px 0 8px' }}>{item.title}</h2>
        <p style={{ color: 'var(--ink-soft)', margin: '0 0 16px', fontSize: 14 }}>{c?.intro}</p>
        <div style={{ display: 'grid', gap: 14 }}>
          {fields.map((f, i) => (
            <div key={i}>
              <label style={{ display: 'block', fontSize: 13, marginBottom: 6 }}>{f.label}</label>
              {f.hint && <div style={{ fontSize: 12, color: 'var(--ink-soft)', marginBottom: 6 }}>{f.hint}</div>}
              {f.type === 'scale' ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <input type="range" min={0} max={10} value={vals[i] || 0} disabled={saved}
                    onChange={(e) => { const n = [...vals]; n[i] = e.target.value; setVals(n) }} style={{ flex: 1 }} />
                  <span style={{ width: 28, textAlign: 'right' }}>{vals[i] || 0}</span>
                </div>
              ) : f.type === 'text' ? (
                <input type="text" value={vals[i]} disabled={saved}
                  onChange={(e) => { const n = [...vals]; n[i] = e.target.value; setVals(n) }} />
              ) : (
                <textarea className="ta" rows={3} value={vals[i]} disabled={saved}
                  onChange={(e) => { const n = [...vals]; n[i] = e.target.value; setVals(n) }} />
              )}
            </div>
          ))}
        </div>
        {!saved
          ? <button className="btn-spark" onClick={save} disabled={busy} style={{ marginTop: 18 }}>
              {busy ? 'Ukládám…' : 'Uložit vyplněné'}</button>
          : <p style={{ marginTop: 16, color: '#a9f0c5', fontSize: 14 }}>Uloženo do tvého profilu.</p>}
      </div>
    </div>
  )
}

// ---------- 5) PRŮVODCE (čtení) ----------
export function GuideView({ item, onBack }) {
  const c = item.content
  return (
    <div style={{ maxWidth: 780, margin: '0 auto' }}>
      <BackBtn onBack={onBack} />
      <div className="glass" style={{ borderRadius: 18, padding: '1.75rem' }}>
        <div style={{ fontSize: 12, color: 'var(--ink-soft)' }}>{item.theme}</div>
        <h2 style={{ fontSize: 25, margin: '4px 0 18px' }}>{item.title}</h2>
        {(c?.sections || []).map((s, i) => (
          <div key={i} style={{ marginBottom: 18 }}>
            <h3 style={{ fontSize: 17, margin: '0 0 6px' }}>{s.heading}</h3>
            <p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.65, margin: 0, color: 'var(--ink)' }}>{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
