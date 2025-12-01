# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Wuvè Zyé is a consumer rights advocacy association website for Martinique and the French Caribbean diaspora. The site is built with Next.js 16 (App Router) and focuses on consumer protection, GDPR compliance audits ("RGPD Péyi-a"), and collective actions.

**Domain**: wuvezye.com
**Contact Email**: wuvezye@gmail.com
**Tech Email**: tech@wuvezye.com

### Admin Credentials
- **Username**: WuveAdmin@
- **Email**: tech@wuvezye.com
- **Role**: ADMIN

## Deployment

The site is deployed on **Cloudflare Pages** (Cloudflare Netherlands B.V., Europe) with **D1** database. Keep in mind:
- Edge runtime compatibility required for API routes
- Use Cloudflare D1 (SQLite) for persistence
- Static assets served via Cloudflare CDN
- Environment variables configured in Cloudflare dashboard

## Commands

```bash
npm run dev        # Start development server
npm run build      # Production build
npm run lint       # Run ESLint
npm run start      # Start production server

# Database commands
npm run db:seed    # Seed database with initial data
npm run db:migrate # Run Prisma migrations
npm run db:generate # Generate Prisma client
npm run db:studio  # Open Prisma Studio

# Add blog articles
npx ts-node prisma/add-fanon-article.ts
npx ts-node prisma/add-afro-descendants-article.ts
npx ts-node prisma/add-professionnels-article.ts
```

## Architecture

### Tech Stack
- **Framework**: Next.js 16 with App Router (React 19)
- **Database**: Prisma ORM with SQLite (local) / Cloudflare D1 (production)
- **Styling**: Tailwind CSS v4 with shadcn/ui (New York style)
- **Package Manager**: npm
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation

### Visual Identity
- **Primary Red**: #B91C1C (also #d62828 for accent)
- **Black**: #000000
- **Cream/Light**: #F5F5F4
- **Green accent**: #2a9d2a

### Directory Structure
- `app/` - Next.js App Router pages (each folder is a route)
- `app/api/` - API routes (auth, posts CRUD, problems, contacts)
- `app/admin/` - Protected admin pages (blog management, dashboard)
- `app/modeles/` - RGPD letter templates pages (list + dynamic [slug])
- `components/` - React components
- `components/ui/` - shadcn/ui primitives
- `lib/` - Utilities and core logic
- `lib/db.ts` - Prisma client singleton
- `lib/posts.ts` - Blog post database queries
- `lib/i18n.ts` - Complete translations for 7 languages
- `prisma/` - Prisma schema, migrations, and article seed scripts
- `data/` - Static data (actions, RGPD templates, barometer)
- `hooks/` - Custom React hooks
- `public/` - Static assets (including logo SVG, robots.txt)
- `public/images/wuvezye/` - Homepage images (AI-generated, with labels)

### Key Systems

**Database** (`prisma/schema.prisma`, `lib/db.ts`):
- Prisma ORM with SQLite
- Models: User, Post (+ Probleme, Temoignage, Contact planned)
- User roles stored as strings: ADMIN, REDACTEUR, MEMBRE, INVITE
- Post status: DRAFT, PUBLISHED

**Blog System** (`lib/posts.ts`, `app/api/posts/`):
- Full CRUD API for blog posts
- Admin interface at `/admin/blog`
- Members-only posts support
- Markdown content with basic rendering
- Article scripts in `prisma/` folder for batch inserts

**Articles à la une** (`lib/articles.ts`, `app/api/articles-une/`, `app/api/article-click/`):
- Intelligent article featuring system with click tracking
- Algorithm: 70% popularity (clicks) + 30% random rotation
- Featured articles (`featured: true`) have priority
- `ArticleStats` model tracks clicks and last clicked timestamp
- API endpoints:
  - `GET /api/articles-une?count=3` - Get featured articles
  - `POST /api/article-click` - Track article click (fire-and-forget)
- Components:
  - `ArticleCard` - Reusable card with click tracking
  - `ArticlesSection` - Client component for homepage
- Sections displayed on `/blog` ("À la une") and homepage ("Nos articles")

**RGPD Templates** (`data/templates-rgpd.ts`, `app/modeles/`):
- 5 ready-to-use RGPD letter templates
- Access, Rectification, Erasure, Opposition, Reminder
- Interactive pages at `/modeles/[slug]` with form filling, copy, download
- Listed on `/modeles` and linked from `/rgpd-peyi-a`

**Internationalization** (`lib/i18n.ts`, `components/language-context.tsx`):
- Supports 7 languages: French (fr), Créole Martiniquais (mq), Créole Guadeloupéen (gp), Créole Haïtien (ht), English (en), Spanish (es), Portuguese (pt)
- Uses React Context with localStorage persistence
- 50+ translation keys per language covering all homepage sections
- Translation key format: `"section.key"` (e.g., `"nav.home"`, `"hero.title"`, `"problems.bank"`)

**Authentication** (`lib/auth.ts`, `app/api/auth/`):
- Passwordless email-based login with 6-digit codes
- In-memory session storage (demo mode)
- User roles: MEMBRE, ADMIN, REDACTEUR
- Admin emails: wuvezye@gmail.com

**SEO & Security** (`app/layout.tsx`, `next.config.mjs`):
- JSON-LD structured data (Organization, WebSite schemas)
- Open Graph and Twitter Card metadata
- Security headers: CSP, X-XSS-Protection, X-Frame-Options, HSTS, Referrer-Policy
- Dynamic sitemap at `/sitemap.xml` (includes all static pages + RGPD templates)
- Robots.txt blocking /admin/ and /api/

**Theme** (`components/theme-provider.tsx`):
- Dark/light mode using next-themes
- System preference detection

### Path Aliases
- `@/*` maps to project root (configured in tsconfig.json)

## Content

- Blog posts stored in SQLite database (seeded from `prisma/seed.ts`)
- Additional articles via dedicated scripts in `prisma/`:
  - `add-fanon-article.ts` - Frantz Fanon centenary article
  - `add-afro-descendants-article.ts` - US Black structures (CBC, NAACP, BLM)
  - `add-professionnels-article.ts` - Small business owners and Wuvè Zyé
- `data/actions-collectives.json` - Collective action campaigns
- `data/rgpd-barometre.json` - GDPR compliance audit results (20 sites)
- `data/templates-rgpd.ts` - RGPD letter templates with placeholders

## Site Structure

### Main Pages
- `/` - Home with hero, Mawonerie section, problem cards, actions, membership (fully translated)
- `/blog` - Blog listing
- `/blog/[slug]` - Individual blog post
- `/rgpd-peyi-a` - RGPD operation page with barometer, template links, donation CTA
- `/modeles` - RGPD letter templates listing
- `/modeles/[slug]` - Interactive template page (form, preview, copy/download)
- `/actions-collectives` - Collective actions listing
- `/probleme` - Problem submission form
- `/adhesion-et-dons` - Membership and donations
- `/association` - About the association
- `/nos-combats` - Our causes/fights
- `/mentions-legales` - Legal mentions
- `/politique-confidentialite` - Privacy policy
- `/login` - Authentication

### Admin Pages
- `/admin/blog` - Blog management dashboard
- `/admin/blog/new` - Create new post
- `/admin/blog/[id]/edit` - Edit existing post

## Language & Locale

The site's primary language is French, with strong emphasis on Martinican Creole ("Kréyòl Matnik"). Keep messaging consistent with the association's activist tone - direct, no-nonsense consumer advocacy.

### Supported Languages
| Code | Language | Notes |
|------|----------|-------|
| fr | Français | Primary, full translations |
| mq | Kréyol Matinitjé | Martinican Creole |
| gp | Kréyol Gwadloupéyen | Guadeloupean Creole |
| ht | Kreyòl Ayisyen | Haitian Creole |
| en | English | For diaspora |
| es | Español | Caribbean Spanish |
| pt | Português | Brazilian Portuguese |

### Brand Voice
- "Mawonerie moderne" (modern marronage) - resistance, independence, collective action
- Direct and no-nonsense communication
- Consumer empowerment, not just advice
- "Wuvè Zyé" = "Open your eyes" in Creole

## Key Concepts

### Mawonerie (Marronage)
Historical reference to enslaved people who escaped and formed independent communities. Applied to modern consumer defense: resisting corporate abuses, organizing collective action, sharing information. Digital marronage = using legal tools (RGPD, mediators, CNIL) to fight back.

### RGPD Péyi-a
Local GDPR operation - auditing Martinican websites and services for data protection compliance, providing templates for citizens to exercise their rights. Barometer data in `data/rgpd-barometre.json`.

### Bloc vs Individual
Wuvè Zyé doesn't just handle individual cases - it builds collective power through:
- Baromètres (data collection)
- Actions collectives (class actions)
- Public positioning
- Coordination with other organizations

## Maintenance Mode

The site has a built-in maintenance mode system that can be activated during updates.

### Activation
Set `MAINTENANCE_MODE=true` in environment variables (Cloudflare dashboard or `.env`).

### Features
- **Maintenance page** (`/maintenance`) with secure contact form
- **Middleware** redirects all traffic to maintenance page when enabled
- **IP whitelist** for admin access during maintenance
- **Cookie bypass** for admins with secret token
- **Rate limiting** on contact form (3 requests/minute per IP)
- **Spam protection** with honeypot field and pattern detection

### Environment Variables
```bash
MAINTENANCE_MODE=true                    # Enable maintenance mode
MAINTENANCE_MESSAGE="Custom message"     # Optional custom message
MAINTENANCE_ALLOWED_IPS="1.2.3.4,5.6.7.8" # Admin IPs (comma-separated)
MAINTENANCE_BYPASS_SECRET="secret"       # Cookie bypass secret
MAINTENANCE_END_TIME="2025-01-15T18:00:00Z" # Estimated end time
ADMIN_SECRET="admin-secret"              # For retrieving contact messages
```

### Always Accessible Paths
Even during maintenance, these paths remain accessible:
- `/maintenance` - The maintenance page itself
- `/api/contact/maintenance` - Contact form API
- `/api/health` - Health check endpoint
- `/_next/*` - Next.js static assets
- Static files (images, CSS, JS, fonts)

## API Endpoints

### Authentication
- `POST /api/auth/send-code` - Send login code
- `POST /api/auth/verify-code` - Verify code and create session
- `POST /api/auth/logout` - End session
- `GET /api/auth/me` - Get current user

### Blog Posts
- `GET /api/posts` - List posts (public: published only, admin: all)
- `POST /api/posts` - Create post (admin/redacteur)
- `GET /api/posts/[id]` - Get single post
- `PATCH /api/posts/[id]` - Update post
- `DELETE /api/posts/[id]` - Delete post (admin only)
- `POST /api/posts/[id]/publish` - Publish post
- `DELETE /api/posts/[id]/publish` - Unpublish post

### Articles à la une
- `GET /api/articles-une?count=N` - Get N featured articles (default: 3)
- `POST /api/article-click` - Track article click (body: `{ slug: string }`)

### Maintenance & Health
- `GET /api/health` - Health check (returns status, maintenance mode, version)
- `POST /api/contact/maintenance` - Submit contact message during maintenance
- `GET /api/contact/maintenance` - Retrieve messages (requires Bearer token)

## Blog Article Categories

- **Vie de l'asso** - Association news, positioning, internal updates
- **Inspirations & luttes** - External examples, political analysis, movement building
- **Guides pratiques** - How-to articles, RGPD guides, consumer tips
- **Alertes conso** - Consumer alerts, scam warnings
- **Témoignages** - Member stories, case studies

## Current Blog Articles (in database)

1. **Frantz Fanon : du Neg Mawon au mawon numérique** (`frantz-fanon-neg-mawon-mawon-numerique`)
   - Category: Vie de l'asso
   - Theme: Fanon centenary, modern marronage

2. **Afro-descendants aux États-Unis : comment les structures collectives font bouger le système** (`afro-descendants-etats-unis-structures-collectives-black-caucus`)
   - Category: Inspirations & luttes
   - Trilingual: FR + EN summary + Kréyol version
   - Theme: CBC, NAACP, BLM, lessons for Caribbean organizing

3. **Professionnels et Wuvè Zyé : avant d'être patrons, nous sommes des gens** (`professionnels-et-wuve-zye`)
   - Category: Vie de l'asso
   - Theme: Small business owners as consumers too, inclusive marronage

## Homepage Images

The homepage uses 3 AI-generated images stored in `public/images/wuvezye/`:

| File | Section | Description |
|------|---------|-------------|
| `hero-consommatrice.png` | Hero | Portrait of a determined Martinican woman in a red shirt on a Fort-de-France street |
| `action-collective-reunion.png` | Actions collectives | 6 Afro-descendant people in a meeting around a table |
| `audit-numerique-ecran.png` | Soutenir nos actions numériques | Group of people viewing an "AUDIT" screen from behind |

### Image Guidelines
- All images have a "image générée" label (GeneratedLabel component)
- Use `next/image` with `sizes` attribute for responsive optimization
- Hero image: `priority` loading, others: `loading="lazy"`
- Next.js automatically converts to WebP/AVIF format
- Responsive sizes: `(max-width: 768px) 100vw, 50vw`

## Performance Optimizations

### Image Optimization (`next.config.mjs`)
- Formats: AVIF, WebP (automatic conversion)
- Device sizes: 640, 750, 828, 1080, 1200, 1920, 2048
- Image sizes: 16, 32, 48, 64, 96, 128, 256, 384
- Compression enabled

### Font Loading (`app/layout.tsx`)
- Inter + Geist Mono fonts
- `display: swap` for no FOIT
- Preloaded for faster rendering

### Security Headers
- Content-Security-Policy
- Strict-Transport-Security (HSTS)
- X-Frame-Options, X-Content-Type-Options
- Permissions-Policy (no camera, microphone)

### SEO (`app/layout.tsx`, `app/sitemap.ts`)
- JSON-LD structured data (Organization, WebSite)
- Open Graph + Twitter Card metadata
- Dynamic sitemap with all pages + RGPD templates
- robots.txt blocking /admin/, /api/

## Deployment Guide

### Prerequisites
1. Cloudflare account with Pages and D1 enabled
2. Node.js 18+ and npm installed locally
3. Git repository connected to Cloudflare Pages

### Pre-deployment Checklist

```bash
# 1. Run database migrations
npx prisma migrate dev --name "add-article-stats"

# 2. Generate Prisma client
npx prisma generate

# 3. Seed database if fresh deployment
npm run db:seed

# 4. Build and test locally
npm run build
npm run start

# 5. Run linting
npm run lint
```

### Environment Variables (Cloudflare Dashboard)

Required in Cloudflare Pages > Settings > Environment Variables:

```bash
# Database
DATABASE_URL="file:./dev.db"          # Local
# For D1: connection handled by @prisma/adapter-d1

# Authentication
AUTH_SECRET="your-random-secret-32-chars"
ADMIN_EMAILS="wuvezye@gmail.com,tech@wuvezye.com"

# Maintenance Mode (optional)
MAINTENANCE_MODE="false"
MAINTENANCE_MESSAGE=""
MAINTENANCE_BYPASS_SECRET="your-bypass-secret"
MAINTENANCE_ALLOWED_IPS=""

# Admin
ADMIN_SECRET="your-admin-api-secret"
NEXT_PUBLIC_ADMIN_SECRET="same-as-above-for-client"
```

### Cloudflare D1 Setup

```bash
# 1. Create D1 database
wrangler d1 create wuvezye-db

# 2. Update wrangler.toml with database ID
# [[d1_databases]]
# binding = "DB"
# database_name = "wuvezye-db"
# database_id = "your-database-id"

# 3. Apply migrations to D1
wrangler d1 execute wuvezye-db --file=prisma/migrations/*/migration.sql
```

### Deployment Commands

```bash
# Deploy to Cloudflare Pages
npm run build
# Automatic deployment on git push if connected

# Manual deploy with Wrangler
npx wrangler pages deploy .next
```

### Post-deployment Verification

1. **Health check**: `GET https://wuvezye.com/api/health`
2. **Blog page**: Verify articles appear on `/blog` and homepage
3. **Click tracking**: Click an article, verify stats update in database
4. **Admin access**: Login at `/login` and check `/admin/blog`
5. **Maintenance mode**: Test toggle in admin panel

### Rollback Procedure

```bash
# Cloudflare Pages - rollback to previous deployment
# Go to Cloudflare Dashboard > Pages > wuvezye > Deployments
# Click "Rollback" on previous successful deployment

# Database rollback (if needed)
wrangler d1 execute wuvezye-db --command="DELETE FROM ArticleStats;"
```

## Database Models

### Post (updated)
```prisma
model Post {
  id            String        @id @default(cuid())
  slug          String        @unique
  title         String
  excerpt       String
  content       String
  category      String        @default("Vie de l'asso")
  isMembersOnly Boolean       @default(false)
  featured      Boolean       @default(false)  // NEW
  status        String        @default("DRAFT")
  authorId      String
  author        User          @relation(fields: [authorId], references: [id])
  publishedAt   DateTime?
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
  stats         ArticleStats? // NEW
}
```

### ArticleStats (new)
```prisma
model ArticleStats {
  id          String    @id @default(cuid())
  postId      String    @unique
  post        Post      @relation(fields: [postId], references: [id], onDelete: Cascade)
  clicks      Int       @default(0)
  lastClicked DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}
```

## Articles Status

### Published (11 articles)
- frantz-fanon-neg-mawon-mawon-numerique
- afro-descendants-etats-unis-structures-collectives-black-caucus (trilingual: FR/EN/Kréyol)
- professionnels-et-wuve-zye
- bienvenue-sur-wuve-zye
- comment-contester-une-facture
- rgpd-peyi-a-lancement
- arnaque-telephonique-martinique
- droits-consommateurs-garantie
- banques-frais-caches
- eau-martinique-qualite
- internet-telecom-martinique

### Drafts (incomplete)
- mawonerie-moderne-consommateurs
- de-neg-mawon-a-mawon-numerique

### Translation Needed
- **Fanon article**: Needs English (EN) + Kréyol (mq) versions
- **Afro-descendants article**: Already trilingual (FR/EN/Kréyol) ✓
