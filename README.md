# Keith Templates

Project scaffolds and reusable patterns for the Keith Design System.

## Quick Start

```bash
# Clone the repo
git clone https://github.com/keithbarney/keith-templates.git ~/Projects/keith-templates

# Create a new web app from the template
./scripts/new-webapp.sh my-app "My App" "A web application"
cd ~/Projects/apps/my-app
npm install
npm run dev

# Or create a new Figma plugin
./scripts/new-plugin.sh my-plugin "My Plugin" "A Figma plugin"
cd ~/Projects/figma-plugins/my-plugin
npm install
npm run dev
```

## Contents

### `/web-app`

React + Vite starter template with:

- `package.json` — build/dev/preview scripts
- `vite.config.js` — Vite configuration
- `src/styles/tokens.css` — design tokens (Swiss Modernism palette)
- `src/styles/base.css` — resets, typography, layout utilities
- `src/components/` — Button and Card components
- `CLAUDE.md` — project-specific AI instructions template
- `DEPLOY.md` — deployment guide (Vercel, Netlify, Cloudflare, GitHub Pages)
- `.env.example` — optional Supabase integration

### `/figma-plugin`

Figma plugin starter with:

- `code.ts` — plugin logic (runs in Figma sandbox)
- `ui.src.html` — UI source (compiled to `ui.html` via `build-ui.js`)
- `heavy-theme.css` — shared dark theme (Spacegray / Base16 Ocean)
- `shared/` — typed messaging, Figma API helpers, UI component CSS
- `styleguide.src.html` — auto-generated styleguide for the theme
- `CLAUDE.md` — AI instructions template
- `PUBLISH.md` — publishing checklist and asset specs

### `/patterns`

Reusable CSS components for the Keith Design System:

| Pattern | Description |
|---------|-------------|
| `card.css` | Surface containers with header/body/footer and variants |
| `button.css` | Primary, secondary, ghost buttons with sizes |
| `form.css` | Inputs, labels, selects, checkboxes, validation states |
| `data-display.css` | Stats, key-value pairs, data tables, badges |
| `nav.css` | Header, breadcrumbs, tabs, sidebar navigation |
| `animations.css` | Fade, slide, scale, skeleton loading, stagger |

### `/scripts`

- `new-webapp.sh` — scaffold a new web app from the template
- `new-plugin.sh` — scaffold a new Figma plugin from the template
- `screenshot-uis.js` — headless Chrome screenshots of plugin UIs

## Usage

### Using scaffold scripts (recommended)

```bash
# New web app
./scripts/new-webapp.sh my-app "My App" "Description"

# New Figma plugin
./scripts/new-plugin.sh my-plugin "My Plugin" "Description"
```

The scripts copy the template, replace `{{PLACEHOLDER}}` tokens, and initialize git.

### Manual copy

```bash
cp -r ~/Projects/keith-templates/patterns/card.css ./src/styles/components/
```

## Related

- [heavy-design-system](https://github.com/keithbarney/heavy-design-system) — Core design system
- [keith-barney-portfolio](https://github.com/keithbarney/keith-barney-portfolio) — Portfolio site

## License

MIT
