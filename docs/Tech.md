# MenuQR - Tech Stack & Development Rules

## Tech Stack
- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript (Strict mode)
- **Styling**: Tailwind CSS 4.x + shadcn/ui components
- **Database & Auth**: Supabase (PostgreSQL, Row Level Security)
- **Package Manager**: pnpm
- **Deployment**: Vercel

## Development Rules
1. Always use `pnpm` for package management.
2. Prefer server components by default; use `'use client'` only when necessary (e.g., hooks, event listeners).
3. Keep UI components in `components/ui` (shadcn) and business logic in `lib/` or `app/` API routes.
4. Never commit `.env` files. Use `.env.local` for local development.
5. Write meaningful, conventional commit messages (e.g., `feat: add supabase client`, `fix: hydration mismatch in dashboard`).
6. All identifiers, aliases, comments, documentation and commit messages must be in English. Serbian is for chat only.