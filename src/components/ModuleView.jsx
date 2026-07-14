import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { generateContent } from '../lib/ai'
import { StoryPlayer, InterviewPlayer, ConceptPlayer, ToolPlayer, GuideView } from './Players'

const CONFIG = {
  clinical_story: { title: 'Klinické příběhy', sub: 'Přečti kazuistiku a odpověz na diagnostické otázky. AI ti odpovědi ohodnotí.', count: (c) => (c?.diagnostic_questions?.length || 0) + ' otázek', Player: StoryPlayer },
  interview_trainer: { title: 'Trenažér rozhovoru', sub: 'Přečti scénář, napiš reakci terapeuta a nech si ji ohodnotit.', count: () => 'scénář rozhovoru', Player: InterviewPlayer },
  conceptualization: { title: 'KBT konceptualizace', sub: 'Poskládej případ do pěti vrstev KBT modelu. AI zhodnotí každou vrstvu.', count: (c) => (c?.layers?.length || 0) + ' vrstev', Player: ConceptPlayer },
  tool: { title: 'Knihovna nástrojů', sub: 'Vyplň pracovní formuláře vygenerované z tvé látky.', count: (c) => (c?.fields?.length || 0) + ' polí', Player: ToolPlayer },
  guide: { title: 'Průvodce praxí', sub: 'Studijní materiály a struktura sezení z tvých poznámek.', count: (c) => (c?.sections?.length || 0) + ' sekcí', Player: GuideView },
}

export default function ModuleView({ session, type }) {
  const cfg = CONFIG[type]
  const [items, setItems] = useState(null)
  const [active, setActive] = useState(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)

  async function load() {
    const { data } = await supabase.from('modules').select('*')
      .eq('user_id', session.user.id).eq('module_type', type)
      .order('created_at', { ascending: false })
    setItems(data || [])
  }
  useEffect(() => { load() }, [session, type])

  async function generateMore() {
    setError(null); setBusy(true)
    try {
      // najdi zdrojový materiál (z nejnovějšího modulu, jinak nejnovější materiál)
      let materialId = items?.[0]?.material_id
      let material
      if (materialId) {
        const { data } = await supabase.from('materials').select('*').eq('id', materialId).maybeSingle()
        material = data
      }
      if (!material) {
        const { data } = await supabase.from('materials').select('*')
          .eq('user_id', session.user.id).order('created_at', { ascending: false }).limit(1).maybeSingle()
        material = data
      }
      if (!material?.raw_text) throw new Error('Nemám z čeho generovat. Nejdřív nahraj materiál.')

      const avoid = (items || []).map((it) => it.title)
      const generated = await generateContent(type, material.raw_text, avoid)
      if (!generated.length) throw new Error('AI nevrátila nový obsah. Zkus to znovu nebo přidej materiál.')

      const rows = generated.map((g) => ({
        user_id: session.user.id, material_id: material.id, module_type: type,
        title: g.title, theme: g.theme, content: g,
      }))
      await supabase.from('modules').insert(rows)
      await load()
    } catch (e) { setError(e.message) } finally { setBusy(false) }
  }

  async function deleteItem(e, id) {
    e.stopPropagation()
    if (!window.confirm('Opravdu smazat tuto položku? Tvoje uložená hodnocení v pokroku zůstanou zachována.')) return
    await supabase.from('modules').delete().eq('id', id)
    await load()
  }

  if (active) {
    const Player = cfg.Player
    return <Player session={session} item={active} onBack={() => setActive(null)} />
  }

  return (
    <div style={{ maxWidth: 820, margin: '0 auto' }}>
      <h2 style={{ fontSize: 26, margin: '0 0 6px' }}>{cfg.title}</h2>
      <p style={{ color: 'var(--ink-soft)', marginTop: 0, fontSize: 15 }}>{cfg.sub}</p>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', margin: '16px 0', flexWrap: 'wrap' }}>
        <button className="btn-spark" onClick={generateMore} disabled={busy}>
          {busy ? 'Generuji…' : (items?.length ? 'Vygenerovat další' : 'Vygenerovat')}
        </button>
        {items?.length === 0 && <span style={{ color: 'var(--ink-soft)', fontSize: 14 }}>Zatím tu nic není — vygeneruj z nahraného materiálu.</span>}
      </div>
      {error && <p style={{ color: '#ff9d9d', fontSize: 14 }}>{error}</p>}

      {items === null && <p style={{ color: 'var(--ink-soft)' }}>Načítám…</p>}

      <div style={{ display: 'grid', gap: 12, marginTop: 6 }}>
        {items?.map((it) => (
          <div key={it.id} className="glass card-int"
            style={{ position: 'relative', borderRadius: 16, padding: '1.15rem', cursor: 'pointer' }}
            onClick={() => setActive(it)}>
            <button title="Smazat" onClick={(e) => deleteItem(e, it.id)}
              style={{ position: 'absolute', top: 10, right: 10, background: 'transparent',
                border: '1px solid var(--glass-border)', color: 'var(--ink-soft)', borderRadius: 8,
                padding: '3px 9px', cursor: 'pointer', fontSize: 12 }}>
              Smazat
            </button>
            <div style={{ fontSize: 12, color: 'var(--ink-soft)', marginBottom: 4, paddingRight: 70 }}>{it.theme}</div>
            <div style={{ fontSize: 18, paddingRight: 70 }}>{it.title}</div>
            <div style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 6 }}>{cfg.count(it.content)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
