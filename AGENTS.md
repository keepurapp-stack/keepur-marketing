# AGENTS.md — Keepur marketing site (`keepur-marketing`)

Public website at `keepur.app`. Workspace overview: `../AGENTS.md`.

## Stack and commands

Next 16 App Router, React 19, Tailwind 4, framer-motion. `npm run dev` · `npm run build` · `npm run lint`. Env (name only): `NEXT_PUBLIC_KEEPUR_BASE_API` (backend origin; code falls back to `https://api.keepur.app`).

## Routes and languages (`src/app/`)

English and Bangla are two route groups with their own root layout (`<html lang>`): `(en)/` serves `/`, `/[solution]`, `/contact`, `/login`, `/signup`; `(bn)/bn/` serves `/bn`, `/bn/[solution]`, `/bn/contact`. Pages are thin wrappers around shared components in `src/components/site/` that take `locale` + a dictionary. `global-not-found.tsx` (experimental `globalNotFound`) is the 404 for both. `robots.ts`, `sitemap.ts` (lists both languages with hreflang alternates).

- Copy lives in `src/i18n/en.ts` and `src/i18n/bn.ts` (typed by `Dictionary`; `bn` must match `en`'s shape). Solution pages carry `en`/`bn` copy in `src/lib/solutions.ts`. **Every user-facing string goes in both dictionaries.**
- `pageMetadata(title, description, englishPath, locale)` in `src/lib/seo.ts` emits canonical + `en`/`bn`/`x-default` alternates. `localePath(locale, path)` builds links; the header `LanguageSwitcher` maps the current path to the other language.
- Look: editorial "paper" theme in `src/app/globals.css` (warm paper background, navy `panel-glow` sections, periwinkle + marigold accents, `.mono-label` section indexes, `.accent-serif` headline words, `.card`, `.btn-primary`/`.btn-accent`). Visually inspired by zagle.ai but deliberately different (palette, fonts, hero motif) since it is a direct competitor — keep it that way.
- Fonts (`src/lib/fonts.ts`, CSS vars `--kp-*`): Inter body, Plus Jakarta Sans display, Fraunces italic accent, IBM Plex Mono labels, Hind Siliguri Bangla body, Anek Bangla Bangla headings; `html[lang=bn]` switches to the Bangla stacks.

## Backend calls (three)

- `src/components/site/PartnerLogos.tsx` (server component) → `GET {base}/api/partners/public`, revalidated every 5 min. Logos are managed in keepur-platform-admin → Partner logos; the strip is hidden when the list is empty or the API fails.
- `src/components/site/Pricing.tsx` → `GET {base}/api/plans/public`. **Prices and plan features come from the API; never hardcode them.** Plan buttons link to `https://app.keepur.app/signup?plan=<planKey>`. Keep the entitlement labels aligned with `deshop-frontend` signup cards (stores, team, SKUs, monthly sales; a limit of 0 is hidden). Devices are deliberately not shown on the site until the web app connects devices. Plan names/descriptions come from the API and are not translated.
- `src/components/site/ContactForm.tsx` → `POST {base}/api/contact` (shopName, fullName, email, phoneNumber, monthlyVolume, message). The `monthlyVolume` values are sent in English (Bangla labels are display-only, `contact.volumeLabels`); options and validation are duplicated here from the backend contact options; keep them in sync with `GET /api/platform/contact` when either changes.

## SEO

`SEO-RESEARCH.md` records keyword intents (incl. Bengali terms), structured data in place (Organization, SoftwareApplication, FAQ, breadcrumbs), canonicals/OG, and post-deploy checks. Preserve them when editing pages; add new solution pages via `src/lib/solutions.ts` so sitemap and metadata stay consistent.

## Deploy and branches

`.github/workflows/auto-deploy-{staging,production}.yml` mirror this repo to a destination repo's `release` branch on push to `development` / `production` (Vercel builds it). **Do not push to those branches unless the owner asks.** Current branch: `production`.

## Definition of done

`npm run build` · `npm run lint` · no leftover `console.debug` · nothing committed or pushed unless asked.
