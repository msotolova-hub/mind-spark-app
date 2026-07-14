import { useState } from 'react'
import { supabase } from '../supabaseClient'
import { extractText } from '../lib/extractText'
import { generateContent, MODULE_TYPES } from '../lib/ai'

const GEN_ORDER = ['clinical_story', 'interview_trainer', 'conceptualization', 'tool', 'guide']

export default function Upload({ session, onDone }) {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [fileName, setFileName] = useState('')
  const [material, setMaterial] = useState(null)
  const [busy, setBusy] = useState(false)
  const [genBusy, setGenBusy] = useState(null)
  const [status, setStatus] = useState(null)

  async function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setStatus(null)
    try {
      const extracted = await extractText(file)
      setText(extracted)
      setFileName(file.name)
      if (!title) setTitle(file.name.replace(/\.(pdf|docx|txt|md)$/i, ''))
    } catch (err) { setStatus({ type: 'error', text: err.message }) }
  }

  async function saveMaterial() {
    if (text.trim().length < 40) return setStatus({ type: 'error', text: 'Vlož nebo nahraj text (aspoň pár vět).' })
    setBusy(true); setStatus(null)
    try {
      const { data, error } = await supabase.from('materials').insert({
        user_id: session.user.id, title: title.trim() || 'Poznámky', kind: 'notes', raw_text: text,
      }).select().single()
      if (error) throw error
      setMaterial(data)
      setStatus({ type: 'ok', text: 'Materiál uložený. Teď z něj vyber, co vytvořit.' })
    } catch (err) { setStatus({ type: 'error', text: err.message }) } finally { setBusy(false) }
  }

  async function generate(type) {
    setGenBusy(type); setStatus({ type: 'info', text: 'AI pracuje… může chvíli trvat.' })
    try {
      const items = await generateContent(type, material.raw_text)
      if (!items.length) throw new Error('AI nevrátila obsah. Zkus delší nebo jiný text.')
      const rows = items.map((g) => ({
        user_id: session.user.id, material_id: material.id, module_type: type,
        title: g.title, theme: g.theme, content: g,
      }))
      const { error } = await supabase.from('modules').insert(rows)
      if (error) throw error
      await supabase.from('materials').update({ processed: true }).eq('id', material.id)
      setStatus({ type: 'ok', text: `Hotovo — vytvořeno ${items.length}× ${MODULE_TYPES[type].label}.` })
    } catch (err) { setStatus({ type: 'error', text: err.message }) } finally { setGenBusy(null) }
  }

  return (
    <div style={{ maxWidth: 760, margin: '0 auto' }}>
      <h2 style={{ fontSize: 26, margin: '0 0 6px' }}>Nahrát materiál</h2>
      <p style={{ color: 'var(--ink-soft)', marginTop: 0, fontSize: 15 }}>
        Nahraj poznámky (.pdf, .docx, .txt, .md) nebo je vlož jako text. Pak z nich necháš AI vytvořit
        tréninkový obsah pro jednotlivé moduly.
      </p>

      <div className="glass" style={{ borderRadius: 18, padding: '1.5rem', display: 'grid', gap: 14, marginTop: 18 }}>
        <div>
          <label style={lab}>Název materiálu</label>
          <input type="text" placeholder="např. KBT víkend – listopad" value={title}
            onChange={(e) => setTitle(e.target.value)} disabled={!!material} />
        </div>
        <div>
          <label style={lab}>Soubor s poznámkami</label>
          <input type="file" accept=".pdf,.docx,.txt,.md" onChange={handleFile} disabled={!!material} />
          {fileName && <p style={{ fontSize: 13, color: 'var(--ink-soft)', margin: '6px 0 0' }}>
            Načteno: {fileName} ({text.length.toLocaleString('cs')} znaků)</p>}
        </div>
        <div>
          <label style={lab}>…nebo vlož text ručně</label>
          <textarea className="ta" rows={8} placeholder="Sem můžeš vložit text poznámek." value={text}
            onChange={(e) => setText(e.target.value)} disabled={!!material} />
        </div>

        {!material && (
          <button className="btn-spark" onClick={saveMaterial} disabled={busy}>
            {busy ? 'Ukládám…' : 'Uložit materiál'}
          </button>
        )}

        {material && (
          <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: 14 }}>
            <div style={{ fontSize: 14, marginBottom: 10 }}>Co z materiálu vytvořit?</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {GEN_ORDER.map((t) => (
                <button key={t} className="glass card-int"
                  style={{ borderRadius: 12, padding: '8px 14px', cursor: 'pointer', color: 'inherit', fontSize: 14 }}
                  onClick={() => generate(t)} disabled={!!genBusy}>
                  {genBusy === t ? 'Generuji…' : MODULE_TYPES[t].label}
                </button>
              ))}
            </div>
            <button className="link" style={{ fontSize: 14, marginTop: 16 }} onClick={() => onDone?.()}>
              Hotovo → zpět na přehled
            </button>
          </div>
        )}

        {status && <p style={{ margin: 0, fontSize: 14,
          color: status.type === 'error' ? '#ff9d9d' : status.type === 'ok' ? '#a9f0c5' : 'var(--ink-soft)' }}>
          {status.text}</p>}
      </div>
    </div>
  )
}

const lab = { display: 'block', fontSize: 13, color: 'var(--ink-soft)', marginBottom: 6 }
