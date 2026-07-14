// Těžké knihovny (pdfjs, mammoth) načítáme až v okamžiku nahrání souboru,
// aby se aplikace otevírala rychle.

async function extractPdf(file) {
  const pdfjsLib = await import('pdfjs-dist')
  const workerUrl = (await import('pdfjs-dist/build/pdf.worker.min.mjs?url')).default
  pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl

  const arrayBuffer = await file.arrayBuffer()
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
  let text = ''
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const content = await page.getTextContent()
    text += content.items.map((it) => ('str' in it ? it.str : '')).join(' ') + '\n\n'
  }
  return text.trim()
}

async function extractDocx(file) {
  const mammoth = (await import('mammoth/mammoth.browser')).default
  const arrayBuffer = await file.arrayBuffer()
  const result = await mammoth.extractRawText({ arrayBuffer })
  return result.value
}

// Vytáhne prostý text z nahraného souboru (.pdf, .docx, .txt, .md).
export async function extractText(file) {
  const name = (file.name || '').toLowerCase()
  if (name.endsWith('.pdf')) {
    const text = await extractPdf(file)
    if (!text) {
      throw new Error('Z PDF se nepodařilo přečíst text — může jít o naskenovaný obrázek. Zkus text vložit ručně.')
    }
    return text
  }
  if (name.endsWith('.docx')) return await extractDocx(file)
  if (name.endsWith('.txt') || name.endsWith('.md')) return await file.text()
  throw new Error('Podporované formáty: .pdf, .docx, .txt, .md. Jiné formáty vlož jako text.')
}
