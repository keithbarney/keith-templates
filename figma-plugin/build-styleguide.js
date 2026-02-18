const fs = require('fs');
const path = require('path');

// --- Parse heavy-theme.css :root block ---

const css = fs.readFileSync(path.join(__dirname, 'heavy-theme.css'), 'utf8');
const rootMatch = css.match(/:root\s*\{([\s\S]*?)\}/);
if (!rootMatch) {
  console.error('No :root block found in heavy-theme.css');
  process.exit(1);
}

const groups = [];
let currentGroup = null;

for (const line of rootMatch[1].split('\n')) {
  const trimmed = line.trim();
  const commentMatch = trimmed.match(/^\/\*\s*(.+?)\s*\*\/$/);
  if (commentMatch) {
    currentGroup = { name: commentMatch[1], tokens: [] };
    groups.push(currentGroup);
    continue;
  }
  const propMatch = trimmed.match(/^(--[\w-]+):\s*(.+?)\s*;$/);
  if (propMatch && currentGroup) {
    currentGroup.tokens.push({ name: propMatch[1], value: propMatch[2] });
  }
}

// Token lookup
const tokenMap = {};
for (const g of groups) {
  for (const t of g.tokens) tokenMap[t.name] = t.value;
}

// --- Generate Section 1: Color Tokens ---

const colorGroupLabels = {
  'Colors \u2014 UI': 'UI',
  'Colors \u2014 Text': 'Text',
  'Colors \u2014 Interactive': 'Interactive',
  'Colors \u2014 Feedback': 'Feedback',
};

const borderValue = tokenMap['--color-border'] || '#4f5b66';

function generateColors() {
  let html = '';
  for (const group of groups) {
    const label = colorGroupLabels[group.name];
    if (!label) continue;

    html += `\n    <div class="sg-subtitle">${label}</div>\n`;
    html += '    <div class="sg-grid">\n';

    for (const token of group.tokens) {
      const border = token.value.startsWith('rgba(')
        ? ` border: 1px solid ${borderValue};`
        : '';
      html += '      <div class="sg-swatch">\n';
      html += `        <div class="sg-swatch-color" style="background: ${token.value};${border}"></div>\n`;
      html += '        <div class="sg-swatch-info">\n';
      html += `          <div class="sg-swatch-name">${token.name}</div>\n`;
      html += `          <div class="sg-swatch-value">${token.value}</div>\n`;
      html += '        </div>\n';
      html += '      </div>\n';
    }

    html += '    </div>\n';
  }
  return html;
}

// --- Generate Section 2: Typography & Spacing ---

const sizingTokens = ['--control-height', '--radius', '--font-mono', '--transition'];

function generateTypography() {
  let html = '';

  // Font Sizes
  const typoGroup = groups.find(g => g.name === 'Typography');
  const fontSizes = typoGroup
    ? typoGroup.tokens.filter(t => t.name.startsWith('--font-size-'))
    : [];

  if (fontSizes.length) {
    html += '\n    <div class="sg-subtitle">Font Sizes</div>\n';
    html += '    <div class="sg-example">\n';
    for (const token of fontSizes) {
      html += '      <div class="sg-token-row">\n';
      html += `        <div class="sg-token-label">${token.name}</div>\n`;
      html += `        <span style="font-size: ${token.value}; color: var(--color-text-strong);">The quick brown fox \u2014 ${token.value}</span>\n`;
      html += '      </div>\n';
    }
    html += '    </div>\n';
  }

  // Spacing Scale
  const spacingGroup = groups.find(g => g.name === 'Spacing');
  if (spacingGroup && spacingGroup.tokens.length) {
    html += '\n    <div class="sg-subtitle">Spacing Scale</div>\n';
    html += '    <div class="sg-example">\n';
    for (const token of spacingGroup.tokens) {
      html += '      <div class="sg-spacing-bar">\n';
      html += `        <div class="sg-spacing-bar-label">${token.name}</div>\n`;
      html += `        <div class="sg-spacing-bar-visual" style="width: ${token.value};"></div>\n`;
      html += `        <div class="sg-spacing-bar-value">${token.value}</div>\n`;
      html += '      </div>\n';
    }
    html += '    </div>\n';
  }

  // Sizing & Motion (explicit list — spans multiple CSS groups)
  const sizingEntries = sizingTokens
    .filter(name => tokenMap[name])
    .map(name => ({ name, value: tokenMap[name] }));

  if (sizingEntries.length) {
    html += '\n    <div class="sg-subtitle">Sizing &amp; Motion</div>\n';
    html += '    <div class="sg-example">\n';
    for (const token of sizingEntries) {
      html += '      <div class="sg-token-row">\n';
      html += `        <div class="sg-token-label">${token.name}</div>\n`;
      html += `        <div class="sg-token-value">${token.value}</div>\n`;
      html += '      </div>\n';
    }
    html += '    </div>\n';
  }

  return html;
}

// --- Build output ---

const template = fs.readFileSync(path.join(__dirname, 'styleguide.src.html'), 'utf8');
const output = template
  .replace('<!-- GENERATED_COLORS -->', generateColors())
  .replace('<!-- GENERATED_TYPOGRAPHY -->', generateTypography());

fs.writeFileSync(path.join(__dirname, 'styleguide.html'), output);
console.log('Built styleguide.html');
