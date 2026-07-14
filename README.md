# KBT Masterclass (Mind Spark)

Tréninková webová aplikace pro KBT výcvik. Vite + React + Tailwind, přihlášení
a ukládání dat přes Supabase.

## Nasazení na Netlify
1. Nahraj tuto složku jako nový repozitář (GitHub Desktop → publikovat).
2. Na Netlify: Add new site → Import from GitHub → vyber repozitář.
3. Netlify si build nastaví sám (`npm run build`, výstup `dist`).
4. Deploy → dostaneš živou adresu.

Přihlašovací a databázové klíče (veřejný publishable key) jsou v
`src/supabaseClient.js`. Tajný klíč zde NENÍ a nikdy tu být nesmí.
