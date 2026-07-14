import { supabase } from '../supabaseClient'

async function readError(error, data) {
  if (data?.error) return data.error
  try {
    const ctx = error?.context
    if (ctx && typeof ctx.json === 'function') {
      const body = await ctx.json()
      if (body?.error) return body.error
    }
  } catch { /* ignore */ }
  return error?.message || 'Neznámá chyba při volání AI.'
}

// type: clinical_story | interview_trainer | conceptualization | tool | guide
export async function generateContent(type, text, avoid = []) {
  const { data, error } = await supabase.functions.invoke('kbt-ai', {
    body: { action: 'generate', type, text, avoid },
  })
  if (error || data?.error) throw new Error(await readError(error, data))
  return data.items || []
}

export async function evaluateAnswers(caseText, items) {
  const { data, error } = await supabase.functions.invoke('kbt-ai', {
    body: { action: 'evaluate_response', case_text: caseText, items },
  })
  if (error || data?.error) throw new Error(await readError(error, data))
  return data.evaluations || []
}

// Sdílené popisy typů modulů
export const MODULE_TYPES = {
  clinical_story: { label: 'Kazuistiky' },
  interview_trainer: { label: 'Transkripty' },
  conceptualization: { label: 'Konceptualizace' },
  tool: { label: 'Nástroje' },
  guide: { label: 'Průvodce' },
}
