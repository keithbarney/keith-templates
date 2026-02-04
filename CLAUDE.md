# Keith Templates

Centralized templates for Figma plugins and web apps.

---

## Quick Start

### New Figma Plugin
```bash
./scripts/new-plugin.sh heavy-awesome "Heavy Awesome" "Does awesome things"
cd ~/Projects/heavy-awesome && npm install && npm run dev
```

### New Web App
```bash
./scripts/new-webapp.sh cool-app "Cool App" "A cool web application"
cd ~/Projects/cool-app && npm install && npm run dev
```

---

## Structure

```
keith-templates/
├── figma-plugin/       # Figma plugin template
│   ├── shared/         # Reusable utilities + UI kit
│   └── PUBLISH.md      # Publishing checklist
├── web-app/            # Vite + React template
│   └── DEPLOY.md       # Deployment guide
├── scripts/            # Scaffold scripts
├── patterns/           # CSS pattern library
└── base/               # Legacy base template
```

---

## Naming Conventions

**Folder names:** lowercase with hyphens: `heavy-page-organizer`

**Figma plugins:** "Heavy" prefix for brand consistency

---

## Visual Style

**Swiss Modernism meets Technical Systems** — Precision of Swiss/International style with functional beauty of information systems (cockpit displays, dot matrices, data visualization).

### Color Strategy

- **Foundation:** Black + white / warm neutrals
- **Accent:** One bold color (red, orange, or amber)
- **Contrast:** High contrast text on soft backgrounds

### Typography

- 7-10 words per line (~65ch max-width)
- Flush left, ragged right alignment
- Monospaced fonts for data/metadata
- Mixed weights: light labels, bold values
- Extreme scale contrast

### Visual Elements

- Dot matrix / grid systems as texture
- Bold geometric forms (circles, rounded bars)
- Thin horizontal rules as dividers
- B&W or desaturated photography

### Layout Principles

- Rigid Swiss grid systems
- Asymmetric balance
- Generous whitespace
- 8pt spacing increments

### Components

**Navigation:** Minimal, spaced-out, monospaced metadata

**Data Display:** Cockpit aesthetic, numeric precision, small caps labels

### Influences

Dieter Rams, Müller-Brockmann, Bauhaus, airport displays, cockpit instrumentation

---

## Design Tokens

Base tokens live at `~/Projects/tokens/`. Created in Figma, exported as JSON following the W3C DTCG spec.

### Token Architecture

1. **Base tokens** — Raw values in `~/Projects/tokens/*.json`
2. **Alias tokens** — Project-specific semantic references
3. **CSS output** — Compiled custom properties

### Naming Pattern

```
[project].[category].[group].[variant]
```

**Delimiters:** `.` separates levels, `-` separates words within a segment

**Size abbreviations:** `none`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`

### CSS Output

Dots become hyphens, prefixed with `--`:

`keith.ui.text.strong` → `--keith-ui-text-strong`

---

## Grid System

- **Columns** — 12-column layout
- **Gutters** — 24px between columns
- **Margins** — Asymmetric for visual interest

### Breakpoints

| Name | Min-Width | Use |
|------|-----------|-----|
| sm | 640px | Tablets |
| md | 768px | Small desktops |
| lg | 1024px | Desktops |

### Column Patterns

```
12 = 3+3+3+3 = 4+4+4 = 6+6 = 4+8 = 3+6+3
```

---

## Patterns Library

Common code patterns in `patterns/`:

| Pattern | File |
|---------|------|
| Card component | `patterns/card.css` |
| Button variants | `patterns/button.css` |
| Form elements | `patterns/form.css` |
| Data display | `patterns/data-display.css` |
| Navigation | `patterns/nav.css` |
| Animations | `patterns/animations.css` |

---

## Musk Algorithm

Apply when evaluating features, scope, or priorities:

1. **Question** — Challenge every requirement. Who needs it?
2. **Delete** — Remove everything possible. Add back 10% later.
3. **Simplify** — Optimize only what survives.
4. **Accelerate** — Shorten all feedback loops.
5. **Automate** — Only after validation.

**Never run backwards.** Automating junk scales bad decisions.

---

## MCP Servers

| Server | Purpose |
|--------|---------|
| Figma | Pull designs, extract tokens, generate code |
| GitHub | Repo management, issues, PRs |

---

## Publishing

- **Figma plugins:** See `figma-plugin/PUBLISH.md`
- **Web apps:** See `web-app/DEPLOY.md`

### Monetization (Future)

- Gumroad or Lemonsqueezy for payments
- Free tier + paid features model
- Typical pricing: $5–$29 one-time
