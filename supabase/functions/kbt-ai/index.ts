// KBT Masterclass — AI edge funkce
// Drží OPENAI_API_KEY (Supabase → Edge Functions → Secrets).
// Volá se přes supabase.functions.invoke('kbt-ai', { body: {...} }).
//
// Akce:
//   - generate: { type, text, avoid? }  -> { items: [...] }
//       type: clinical_story | interview_trainer | conceptualization | tool | guide
//   - evaluate_response: { case_text, items[] } -> { evaluations: [...] }

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
const MODEL = "gpt-4o-mini"; // chceš jiný? změň jen tento řádek
const MAX_INPUT_CHARS = 48000;

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });
}

const idealPoints = { type: "array", items: { type: "string" } };

const schemas = {
  clinical_story: {
    key: "stories",
    schema: obj({ stories: arr(obj({
      title: str(), theme: str(), case_text: str(),
      diagnostic_questions: arr(obj({ question: str(), skill_area: str(), ideal_points: idealPoints },
        ["question", "skill_area", "ideal_points"])),
    }, ["title", "theme", "case_text", "diagnostic_questions"])) }, ["stories"]),
  },
  interview_trainer: {
    key: "scenarios",
    schema: obj({ scenarios: arr(obj({
      title: str(), theme: str(), situation: str(),
      transcript: arr(obj({ speaker: str(), text: str() }, ["speaker", "text"])),
      skill_area: str(), ideal_points: idealPoints,
    }, ["title", "theme", "situation", "transcript", "skill_area", "ideal_points"])) }, ["scenarios"]),
  },
  conceptualization: {
    key: "cases",
    schema: obj({ cases: arr(obj({
      title: str(), theme: str(), case_text: str(),
      layers: arr(obj({ key: str(), label: str(), hint: str(), ideal_points: idealPoints },
        ["key", "label", "hint", "ideal_points"])),
    }, ["title", "theme", "case_text", "layers"])) }, ["cases"]),
  },
  tool: {
    key: "tools",
    schema: obj({ tools: arr(obj({
      title: str(), theme: str(), tool_type: str(), intro: str(),
      fields: arr(obj({
        label: str(),
        type: { type: "string", enum: ["text", "textarea", "scale"] },
        hint: str(),
      }, ["label", "type", "hint"])),
    }, ["title", "theme", "tool_type", "intro", "fields"])) }, ["tools"]),
  },
  guide: {
    key: "guides",
    schema: obj({ guides: arr(obj({
      title: str(), theme: str(),
      sections: arr(obj({ heading: str(), body: str() }, ["heading", "body"])),
    }, ["title", "theme", "sections"])) }, ["guides"]),
  },
};

function obj(props, required) {
  return { type: "object", additionalProperties: false, required, properties: props };
}
function arr(items) { return { type: "array", items }; }
function str() { return { type: "string" }; }

const systems = {
  clinical_story: `Jsi zkušený lektor výcviku v KBT. Z dodané látky vytvoř realistické klinické kazuistiky pro NÁCVIK ROZPOZNÁVÁNÍ poruch a jejich konceptualizace. Frekventant má poruchu i KBT konstrukty (automatické myšlenky, jádrová přesvědčení, vyhýbavé chování, bludný kruh) rozpoznat SÁM — nesmíš mu je předložit hotové.

KAZUISTIKA (case_text) — zásadní pravidla:
- Piš BOHATÝ souvislý příběh klientovými slovy: 3–4 odstavce, aspoň 15–20 vět. Zahrň: jak potíže začaly a jak se vyvíjely, NĚKOLIK konkrétních situací z běžného života, tělesné prožitky, chování a čemu se vyhýbá, dopad na práci, vztahy a všední den, a co ho nakonec přivedlo do terapie.
- Klientovo uvažování VETKNI PŘIROZENĚ do vyprávění. NEPODÁVEJ automatické myšlenky jako úhledné oddělené citáty typu „naskočí mi myšlenka '…'". Ať to zní jako živý člověk, ne jako učebnicový výčet příznaků — frekventant má sám poznat, co je automatická myšlenka, co vyhýbavé chování apod.
- NIKDY neuváděj název diagnózy ani odborné termíny (NEPIŠ „deprese", „fobie", „úzkostná porucha", „panika", „automatické myšlenky", „jádrové přesvědčení", „bludný kruh", „vyhýbání").
- NEPOUŽÍVEJ návodné signály: žádné uvozovky naznačující odborný pojem (např. slovo „bezpečné" v uvozovkách), žádné meta-komentáře, žádné shrnutí typu „a tak se to točí pořád dokola".
- Popsané potíže ať tvoří JEDEN souvislý a rozpoznatelný klinický obraz odpovídající NĚKTERÉ poruše z dodané látky. NEMÍCHEJ příznaky více poruch dohromady. Nevymýšlej poruchy mimo poznámky.

title: jméno a neutrální popis, např. „Markéta, 35 let – první konzultace". NESMÍ prozradit diagnózu.
theme: neutrální obecný štítek (např. „Ambulantní klientka"), NE název poruchy.

diagnostic_questions: přesně 3 otázky (česky), zodpověditelné z viněty. V zadání otázek NEJMENUJ diagnózu.
- Otázka 1 vždy: "Jakou poruchu popsané potíže nejspíš naznačují? Opři odpověď o konkrétní projevy z textu."
- Otázky 2 a 3: žádej hypotézy opřené o text — které klientovy výroky/postoje působí jako automatické myšlenky; jaké jádrové přesvědčení lze PŘEDPOKLÁDAT a proč; jak by mohl vypadat bludný kruh (spouštěč → myšlenka → emoce → chování) podle popsaného. Formuluj obecně ("klient/ka", "popsané potíže"), bez názvu poruchy.
- skill_area: krátký název dovednosti. ideal_points: 3–5 bodů správné odpovědi opřených o TUTO vinětu (sem PATŘÍ i název poruchy a konkrétní konceptualizace — slouží jen pro hodnocení, frekventant je nevidí).

Vytvoř 3 kazuistiky na různé poruchy z dodané látky.`,

  interview_trainer: `Jsi lektor KBT nácviku vedení rozhovoru. Z dodané látky vytvoř 3–4 scénáře terapeutického rozhovoru pro nácvik.
- Piš česky, smyšlení klienti.
- situation: krátký kontext sezení. transcript: 3–6 replik (speaker "Terapeut" nebo "Klient") končících replikou KLIENTA, na kterou má frekventant zareagovat.
- skill_area (např. "Empatická reflexe", "Sokratovské tázání") a ideal_points (co by dobrá reakce terapeuta měla obsahovat).`,

  conceptualization: `Jsi lektor KBT konceptualizace. Z dodané látky vytvoř 3–4 případy pro nácvik konceptualizace.
- Piš česky, smyšlení klienti. case_text = popis případu klientovými slovy, bez pojmenování diagnózy a bez odborných termínů (ať frekventant konceptualizuje sám).
- layers: PŘESNĚ 5 vrstev v tomto pořadí a s těmito klíči a názvy:
  key "predispozice" label "Predispozice", key "jadrova_presvedceni" label "Jádrová přesvědčení", key "pravidla" label "Pravidla a postoje", key "spoustec" label "Spouštěč", key "bludny_kruh" label "Bludný kruh situační reakce".
- U každé vrstvy hint (co do ní patří) a ideal_points (co má správné vyplnění pro tento případ obsahovat).`,

  tool: `Jsi lektor KBT, který připravuje pracovní formuláře. Z dodané látky vytvoř 3–4 nástroje (např. Záznam automatických myšlenek, Behaviorální experiment, Expozice).
- Piš česky. intro = k čemu nástroj slouží. tool_type = krátký typ.
- fields = položky formuláře; type "text" (krátké), "textarea" (delší), nebo "scale" (0–10). U každé label a hint.`,

  guide: `Jsi lektor KBT tvořící studijní průvodce. Z dodané látky vytvoř 2–4 přehledné edukační průvodce.
- Piš česky. Každý má sections (heading + body) shrnující téma a strukturu sezení dle dodané látky. Věcně, srozumitelně.`,
};

async function callOpenAI(system, user, schemaName, schema) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${OPENAI_API_KEY}` },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: "system", content: system }, { role: "user", content: user }],
      response_format: { type: "json_schema", json_schema: { name: schemaName, strict: true, schema } },
    }),
  });
  if (!res.ok) throw new Error(`OpenAI ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return JSON.parse(data.choices[0].message.content);
}

const EVALUATE_SYSTEM = `Jsi laskavý, ale náročný supervizor KBT výcviku. Hodnotíš odpovědi frekventanta na otázky ke kazuistice, kde klient popsal potíže vlastními slovy (bez pojmenování diagnózy).

Zásady:
- Hodnoť PŘIMĚŘENĚ tomu, co lze z viněty vyvodit. NEŽÁDEJ informace, které v popisu nejsou — v reálné terapii by se zjišťovaly dalším dotazováním. Oceň dobře formulovanou hypotézu opřenou o konkrétní projevy z textu.
- score 1–10 (1 = zásadně mimo; 5–6 = správný směr, ale s mezerami; 8–10 = přesné a dobře opřené o text). Zohledni ideal_points.
- feedback (česky, 2–4 věty): konkrétně co bylo dobře a co chybí; odkaž na konkrétní projevy z viněty. Nebuď obecný.
- model_answer: napiš VZOROVOU správnou odpověď tak, jak by měla vypadat — konkrétně, opřenou o vinětu, aby frekventant přesně viděl, jak to má být.
- strengths a improvements: konkrétní body.
Buď konstruktivní a upřímný.`;

const evalSchema = obj({
  evaluations: arr(obj({
    score: { type: "integer" }, feedback: str(), model_answer: str(),
    strengths: { type: "array", items: { type: "string" } },
    improvements: { type: "array", items: { type: "string" } },
  }, ["score", "feedback", "model_answer", "strengths", "improvements"])),
}, ["evaluations"]);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (!OPENAI_API_KEY) return json({ error: "Chybí OPENAI_API_KEY v Supabase Secrets." }, 500);

  try {
    const body = await req.json();
    let action = body?.action;
    if (action === "generate_clinical_stories") { action = "generate"; body.type = "clinical_story"; }

    if (action === "generate") {
      const type = body.type;
      const cfg = schemas[type];
      if (!cfg) return json({ error: "Neznámý typ obsahu." }, 400);
      const text = String(body.text ?? "").slice(0, MAX_INPUT_CHARS);
      if (text.trim().length < 40) return json({ error: "Text je příliš krátký." }, 400);

      const avoid = Array.isArray(body.avoid) ? body.avoid.filter(Boolean) : [];
      const avoidNote = avoid.length
        ? `\n\nVyhni se opakování těchto už existujících témat/názvů: ${avoid.join("; ")}. Vytvoř JINÉ.`
        : "";

      const out = await callOpenAI(
        systems[type],
        `Zde je látka z výcviku:\n\n${text}${avoidNote}`,
        type, cfg.schema,
      );
      return json({ items: out[cfg.key] ?? [] });
    }

    if (action === "evaluate_response") {
      const caseText = String(body.case_text ?? "");
      const items = Array.isArray(body.items) ? body.items : [];
      if (items.length === 0) return json({ error: "Chybí odpovědi k hodnocení." }, 400);
      const userMsg = `Kontext (co klient/ka popsal/a):\n${caseText}\n\nOhodnoť odpovědi (zachovej pořadí):\n\n` +
        items.map((it, i) =>
          `Zadání ${i + 1} (${it.skill_area}): ${it.question}\n` +
          `Klíčové body správné odpovědi: ${(it.ideal_points ?? []).join("; ")}\n` +
          `Odpověď frekventanta: ${it.user_answer}\n`).join("\n");
      const out = await callOpenAI(EVALUATE_SYSTEM, userMsg, "evaluations", evalSchema);
      return json({ evaluations: out.evaluations ?? [] });
    }

    return json({ error: "Neznámá akce." }, 400);
  } catch (e) {
    return json({ error: String(e instanceof Error ? e.message : e) }, 500);
  }
});
