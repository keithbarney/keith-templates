# {{PLUGIN_NAME}}

{{PLUGIN_DESCRIPTION}}

---

## Structure

```
{{PLUGIN_SLUG}}/
├── manifest.json      # Plugin config
├── package.json       # Scripts & deps
├── code.ts            # Plugin logic (runs in Figma sandbox)
├── ui.html            # Plugin UI
├── shared/
│   ├── figma-helpers.ts   # Figma API utilities
│   ├── messaging.ts       # UI ↔ Plugin communication
│   └── ui-components.css  # UI kit
└── dist/
    └── code.js        # Built output
```

---

## Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Watch mode (auto-rebuild on save) |
| `npm run build` | Production build |
| `npm run typecheck` | Check TypeScript types |

---

## Development Workflow

1. `npm install`
2. `npm run dev` (keep running)
3. In Figma: Plugins → Development → Import from manifest
4. Select `manifest.json` from this folder
5. Edit `code.ts` and `ui.html`, see changes on re-run

---

## Build Target

esbuild uses `--target=es6` because Figma's plugin sandbox doesn't support ES2020+ syntax (e.g., `??`, `?.`). Write modern TypeScript freely — esbuild transpiles it down automatically.

---

## Key Files

### code.ts
Main plugin logic. Uses helpers from `shared/`:
- `getSelection()` — get selected nodes
- `traverse()` — walk node tree
- `sendResult()` / `sendError()` — communicate with UI

### ui.html
Plugin UI. Includes:
- Full UI kit (buttons, inputs, cards, lists, tabs)
- Keyboard shortcuts (Cmd+Enter to run, Esc to close)
- Loading states and error handling

### shared/figma-helpers.ts
Common Figma operations:
- Selection utilities
- Tree traversal
- Notifications
- Color conversion
- Text handling

---

## Publishing

See `PUBLISH.md` for:
- Asset specs (icon, cover)
- Description template
- Step-by-step publishing guide
