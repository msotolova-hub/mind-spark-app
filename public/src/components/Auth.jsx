import { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function Auth() {
  const [mode, setMode] = useState('login') // 'login' | 'signup'
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setBusy(true)
    setMessage(null)

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      })
      setBusy(false)
      if (error) {
        setMessage({ type: 'error', text: prettyError(error.message) })
      } else {
        setMessage({
          type: 'ok',
          text: 'Účet vytvořen. Zkontroluj e-mail a potvrď registraci, pak se přihlas.',
        })
        setMode('login')
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      setBusy(false)
      if (error) setMessage({ type: 'error', text: prettyError(error.message) })
      // při úspěchu přepne appka sama na Dashboard
    }
  }

  return (
    <div style={{ minHeight: '100%', display: 'grid', placeItems: 'center', padding: '1.5rem' }}>
      <div className="glass" style={{ width: '100%', maxWidth: 440, borderRadius: 24, padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <Spark />
          <span style={{ fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-soft)' }}>
            Mind Spark
          </span>
        </div>

        <h1 style={{ fontSize: 30, margin: '0.2rem 0 0.2rem', lineHeight: 1.15 }}>
          KBT <span className="spark-text">Masterclass</span>
        </h1>
        <p style={{ color: 'var(--ink-soft)', marginTop: 0, marginBottom: 22, fontSize: 15 }}>
          {mode === 'login'
            ? 'Přihlas se ke svému tréninkovému prostoru.'
            : 'Založ si účet a začni trénovat.'}
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
          {mode === 'signup' && (
            <input
              type="text"
              placeholder="Jméno"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              autoComplete="name"
            />
          )}
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
          <input
            type="password"
            placeholder="Heslo"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            required
            minLength={6}
          />

          <button className="btn-spark" type="submit" disabled={busy} style={{ marginTop: 4 }}>
            {busy ? 'Pracuji…' : mode === 'login' ? 'Přihlásit se' : 'Vytvořit účet'}
          </button>
        </form>

        {message && (
          <p
            style={{
              marginTop: 14,
              marginBottom: 0,
              fontSize: 14,
              color: message.type === 'error' ? '#ff9d9d' : '#a9f0c5',
            }}
          >
            {message.text}
          </p>
        )}

        <p style={{ marginTop: 20, marginBottom: 0, fontSize: 14, color: 'var(--ink-soft)' }}>
          {mode === 'login' ? 'Nemáš účet? ' : 'Už máš účet? '}
          <button
            type="button"
            className="link"
            onClick={() => {
              setMode(mode === 'login' ? 'signup' : 'login')
              setMessage(null)
            }}
          >
            {mode === 'login' ? 'Zaregistruj se' : 'Přihlas se'}
          </button>
        </p>
      </div>
    </div>
  )
}

function prettyError(text) {
  if (/Invalid login credentials/i.test(text)) return 'Nesprávný e-mail nebo heslo.'
  if (/already registered/i.test(text)) return 'Tento e-mail už je zaregistrovaný. Přihlas se.'
  if (/at least 6/i.test(text)) return 'Heslo musí mít alespoň 6 znaků.'
  return text
}

function Spark() {
  return (
    <svg width="20" height="20" viewBox="0 0 32 32" aria-hidden="true">
      <defs>
        <linearGradient id="s" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f6c453" />
          <stop offset="1" stopColor="#c77dff" />
        </linearGradient>
      </defs>
      <path fill="url(#s)" d="M16 2l2.6 8.4L27 13l-8.4 2.6L16 24l-2.6-8.4L5 13l8.4-2.6z" />
    </svg>
  )
}
