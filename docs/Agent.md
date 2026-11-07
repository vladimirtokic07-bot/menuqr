# Agent Instructions for MenuQR

You are an expert Next.js and Supabase developer assisting the lead engineer. 

## Rules for Execution:
1. **READ FIRST**: Before making changes, always read `PRD.md`, `Tech.md`, and `DB.md` to understand the context.
2. **SAFETY**: Do NOT auto-approve destructive commands (like `rm`, `DROP TABLE`, or overwriting `.env`). Always ask for confirmation.
3. **CHECKPOINTS**: Before starting a multi-file refactor, remind the user to commit current changes.
4. **STYLING**: Use existing shadcn/ui components from `components/ui/`. Do not write custom CSS unless absolutely necessary; use Tailwind utility classes.
5. **SUPABASE**: When writing database queries, always assume Row Level Security (RLS) is enabled. Fetch data using the Supabase JS client in Server Components or Route Handlers.
6. **ERROR HANDLING**: Never leave `console.log` in production code. Use proper error boundaries or toast notifications for user-facing errors.