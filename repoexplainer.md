# Wedding Landing Page Editor

## What This Repo Delivers
This project is a single-page wedding website editor built with Next.js 14. It lets couples or planners craft a polished wedding landing page by mixing prebuilt templates with custom content, palette choices, and imagery. Everything happens client-side: edit form fields, upload photos, toggle sections, and see instant updates in a live preview.

## Core Product Experience
- **Template switching:** Five themed layouts (romantic, modern, vintage, elegant, bohemian) rendered via dedicated template functions. Each template adapts typography and layout while consuming the same wedding data model.
- **Color palette presets:** Curated palettes per template drive Tailwind utility classes so designers can explore looks without leaving the editor.
- **Section management:** A visibility panel lets users enable/disable hero, story, details, timeline, gallery, FAQ, registry, accommodation, and RSVP blocks per page.
- **Rich content editor:** Panel-based forms capture all wedding copy, schedule items, accommodation notes, gift registry text, and RSVP messaging. Dynamic lists support adding/removing timeline events, gallery cards, and FAQ entries.
- **Image workflows:** Local uploads are read with `FileReader`, stored in component state, and substituted into the preview for hero and gallery imagery with delete/replace controls.
- **Preview controls:** Desktop/mobile toggles and a fullscreen mode help review the page across breakpoints without leaving the editor.

## Tech Stack at a Glance
- **Framework:** Next.js App Router with a single client entry (`app/page.tsx`).
- **UI system:** React 18 hooks, shadcn/ui primitives (buttons, inputs, selects, dialogs), Radix-based components, and Tailwind CSS v4 for styling.
- **Icons & visuals:** Lucide icon set plus static wedding photography assets in `public/`.
- **State management:** Local `useState` stores wedding domain data, section visibility, palette choice, and uploaded image blobs—no external persistence.

## Repository Layout Highlights
- `app/page.tsx`: Houses the full editor, data schema (`WeddingData`, `SectionVisibility`), interaction logic, and all five template renderers.
- `app/layout.tsx`: Sets global fonts (Playfair Display & Source Sans 3) and Vercel Analytics wrapper.
- `app/globals.css`: Tailwind layer configuration plus wedding-specific CSS variables for consistent theme propagation.
- `components/ui/*`: Generated shadcn components that supply the design system controls used across the editor.
- `public/`: Bundle of default hero/gallery imagery and placeholders leveraged when no uploads are provided.

## Running the App Locally
```bash
pnpm install
pnpm dev
```
The development server defaults to `http://localhost:3000`, where the editor loads with sample data for Emma & James as a starting point.

## Intended Audience and Purpose
The tool aims to accelerate launch of wedding microsites without hand-coding. It is suited for:
- Couples customizing their digital invitations.
- Wedding planners producing branded landing pages for multiple clients.
- Designers exploring visual directions before handing assets to developers.

Because everything lives in one React page, teams can extend it by persisting data to an API, exporting static pages, or integrating hosted RSVP submissions.
