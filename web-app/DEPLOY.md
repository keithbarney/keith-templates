# Deployment Guide

## Vercel (Recommended)

### First-time Setup

1. **Install Vercel CLI** (optional but useful):
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```
   Or connect GitHub repo at vercel.com/new

3. **Environment Variables** (if using Supabase):
   - Go to Project Settings → Environment Variables
   - Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

### Automatic Deployments

Once connected to GitHub:
- Push to `main` → Production deploy
- Push to other branches → Preview deploy

---

## Other Options

### Netlify
```bash
npm run build
# Drag `dist/` folder to netlify.com/drop
```

### GitHub Pages
```bash
npm run build
# Push `dist/` to `gh-pages` branch
```

### Cloudflare Pages
```bash
npm run build
# Connect repo at dash.cloudflare.com
# Set build command: npm run build
# Set output directory: dist
```

---

## Custom Domain

1. Add domain in Vercel dashboard
2. Update DNS:
   - A record: `76.76.21.21`
   - Or CNAME: `cname.vercel-dns.com`
3. Wait for SSL certificate (automatic)

---

## Checklist

- [ ] `npm run build` works without errors
- [ ] Environment variables set in hosting platform
- [ ] Custom domain configured (optional)
- [ ] Analytics added (optional)
