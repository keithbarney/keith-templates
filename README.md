# Keith Templates

Project scaffolds and reusable patterns for the Keith Design System.

## Quick Start

```bash
# Clone the repo
git clone https://github.com/yourusername/keith-templates.git ~/Projects/keith-templates

# Start a new project
cp -r ~/Projects/keith-templates/base ~/Projects/new-project-name
cd ~/Projects/new-project-name
npm install
npm run dev
```

## Contents

### `/base`

Starter template with:

- `package.json` — build/watch/dev scripts
- `src/styles/tokens.css` — alias tokens referencing base tokens
- `src/styles/base.css` — resets and defaults
- `src/styles/grid.css` — 12-column responsive grid
- `CLAUDE.md` — project-specific instructions template

### `/patterns`

Reusable CSS components:

| Pattern | Description |
|---------|-------------|
| `card.css` | Surface containers with variants |
| `button.css` | Primary, secondary, ghost buttons |
| `form.css` | Inputs, labels, selects, checkboxes |
| `data-display.css` | Stats, key-value pairs, data tables |
| `nav.css` | Header, breadcrumbs, tabs, sidebar |
| `animations.css` | Fade, slide, scale, skeleton loading |

## Usage

Copy patterns into your project as needed:

```bash
cp ~/Projects/keith-templates/patterns/card.css ./src/styles/components/
```

Or import directly if you prefer referencing the source.

## Related

- [keith-design-system](https://github.com/yourusername/keith-design-system) — Core design system
- [keith-barney-portfolio](https://github.com/yourusername/keith-barney-portfolio) — Portfolio site

## License

MIT
