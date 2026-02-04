# {{APP_NAME}}

{{APP_DESCRIPTION}}

---

## Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start dev server (localhost:3000) |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |

---

## Structure

```
{{APP_SLUG}}/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx         # Entry point
│   ├── App.jsx          # Root component
│   ├── components/      # Reusable components
│   │   ├── Button.jsx
│   │   └── Card.jsx
│   └── styles/
│       ├── tokens.css   # Design tokens
│       └── base.css     # Reset + utilities
└── dist/                # Build output
```

---

## Adding Supabase (Optional)

1. Create project at supabase.com
2. Copy `.env.example` to `.env`
3. Add your Supabase URL and anon key
4. Create `src/lib/supabase.js`:

```js
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
```

---

## Deployment

See `DEPLOY.md` for Vercel deployment instructions.
