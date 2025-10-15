# Repository Guidelines

## Project Structure & Module Organization
The App Router lives under `app/`. `app/page.tsx` hosts the authenticated editor and template registry; `app/sites/[slug]/page.tsx` renders published pages; `app/api/sites/` exposes draft/publish endpoints. Auth UI is under `components/auth/`, Supabase clients in `components/supabase-provider.tsx` plus `lib/supabase-*.ts`, shared primitives in `components/ui/`, SQL policies in `supabase/migrations/`, and assets in `public/`. Extend styling via `app/globals.css` or `styles/globals.css` instead of scattering ad-hoc utilities.

## Build, Test, and Development Commands
Install dependencies with `pnpm install`, run `pnpm dev` while iterating, and validate production with `pnpm build` followed by `pnpm start`. Always finish with `pnpm lint` before shipping changes.

## Supabase Auth & Publishing
Provision Supabase, enable Google auth, and populate `.env.local` (see `.env.example`) with `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, and `NEXT_PUBLIC_BASE_DOMAIN`. The editor toolbar calls `/api/sites` to save drafts or publish JSON snapshots; the public site resolves to `https://<slug>.<base-domain>` (e.g., `https://bengt.app.yourdomain.com`) via `middleware.ts`. Set `NEXT_PUBLIC_BASE_DOMAIN=app.yourdomain.com` for wildcard subdomain support. Apply the SQL policies in `supabase/migrations/0001_create_sites.sql` with `npx supabase migration up` (or `db push`) before deploying.

## Coding Style & Naming Conventions
Use TypeScript with 2-space indents, prefer named exports for reusable pieces, and compose with shadcn primitives plus the `cn` helper. Source Tailwind tokens from the global stylesheets, keep feature files in kebab-case, and colocate helpers near their consumer.

## Testing Guidelines
Add coverage with React Testing Library for components and Playwright for end-to-end flows. Store specs beside the target module (or under `tests/`) using the `*.test.tsx` suffix. Prioritise RSVP, template switching, and upload paths, and capture manual QA notes when automation is missing.

## Commit & Pull Request Guidelines
Follow Conventional Commits (e.g., `feat: add vintage palette controls`), keep summaries present-tense and focused, and group related work together. PRs should note intent, attach UI media when relevant, list executed commands, and link planning issues. Request review only after linting succeeds and TODOs are cleared.

## Assets & Configuration Tips
Optimize imagery before placing it in `public/`, tweak palettes or typography through the global stylesheets, record any new env vars in `.env.example`, and never commit secrets.
