# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project type: Next.js (App Router) + Payload CMS (monorepo-style single deployment)
Package manager: pnpm
Node.js engines: ^18.20.2 or >=20.9.0

Environment setup
- Copy environment: duplicate .env.example to .env and fill required values
- Install deps: use pnpm (corepack enable pnpm if needed)

Common commands
- Install
  ```bash path=null start=null
  pnpm install
  ```
- Develop (Next + Payload)
  ```bash path=null start=null
  pnpm dev
  ```
- Build (Next standalone output) and start
  ```bash path=null start=null
  pnpm build
  pnpm start
  ```
- Lint and fix
  ```bash path=null start=null
  pnpm lint
  pnpm run lint:fix
  ```
- Payload utilities (typegen and importmap)
  ```bash path=null start=null
  pnpm run generate:types
  pnpm run generate:importmap
  ```

Testing
- Run all tests (integration + e2e)
  ```bash path=null start=null
  pnpm test
  ```
- Integration tests (Vitest, jsdom)
  ```bash path=null start=null
  pnpm run test:int
  ```
  - Run a single integration test file
    ```bash path=null start=null
    pnpm exec vitest run tests/int/path/to/file.int.spec.ts
    ```
  - Filter by test name/pattern
    ```bash path=null start=null
    pnpm exec vitest run tests/int -t "partial test name"
    ```
- End-to-end tests (Playwright)
  ```bash path=null start=null
  pnpm run test:e2e
  ```
  - Single e2e file
    ```bash path=null start=null
    pnpm exec playwright test tests/e2e/example.spec.ts
    ```
  - Filter by test title
    ```bash path=null start=null
    pnpm exec playwright test -g "partial test name"
    ```
  - Headed/debug
    ```bash path=null start=null
    pnpm exec playwright test --headed --debug
    ```

Database migrations (Payload, Postgres)
- Create a migration locally when making schema changes
  ```bash path=null start=null
  pnpm payload migrate:create
  ```
- Apply pending migrations (e.g., in CI/CD or before start)
  ```bash path=null start=null
  pnpm payload migrate
  ```

Docker
- Production image uses Next.js standalone output (see Dockerfile). For local development, prefer pnpm dev.

Architecture overview
High-level
- Single repo serving both Payload CMS backend and Next.js App Router frontend together. Payload integration is enabled via @payloadcms/next with withPayload in next.config.js. Next output is standalone for containerized deploys.
- Data model and CMS logic live under src, while the Next.js app resides in src/app.

Key directories and responsibilities
- src/app
  - (payload): Admin UI and Payload API routes
    - admin/[[...segments]]: Payload Admin router
    - api/graphql, api/graphql-playground, api/[...slug]: Payload APIs
  - (frontend): Next.js App Router pages for the public site
    - posts/, search/, [slug]/, and sitemaps
- src/collections: Payload collections (Pages, Posts, Users, Media, Categories)
- src/blocks: Layout builder blocks (e.g., Hero, Content, Media, CallToAction, Archive)
- src/access: Access control functions used by collections
- src/hooks: Payload hooks (e.g., draft/live preview, on-demand revalidation, publishing jobs)
- src/endpoints/seed: Seeding endpoint wired to admin seed flow
- src/Header and src/Footer: Global configs and related hooks/components
- src/providers: Theme and UI providers
- src/search: Server-side search integration
- src/migrations: Versioned DB migrations for Postgres
- src/components: Frontend UI, admin bar, rich text, media components, and shared UI

Notable configuration
- next.config.js
  - withPayload() wraps the Next config for seamless Payload + Next integration
  - images.remotePatterns permits media from the app origin and Cloudflare R2/worker proxy
  - output: 'standalone' for optimized Docker image
- eslint.config.mjs
  - Flat config extending next/core-web-vitals and next/typescript; warns for common TS pitfalls
- vitest.config.mts
  - jsdom environment; test files under tests/int/**/*.int.spec.ts
- playwright.config.ts
  - testDir: tests/e2e; starts dev server (pnpm dev) and runs chromium project with HTML reporter
- tsconfig.json
  - Path alias @/* -> ./src/* and @payload-config -> ./src/payload.config.ts

Environment and runtime
- Engines: node ^18.20.2 or >=20.9.0; pnpm ^9 or ^10
- NEXT_PUBLIC_SERVER_URL is derived from Vercel vars or localhost; image domains include Cloudflare R2 and media worker
- Ensure .env is present; see .env.example for required variables (database, storage, email, etc.)

Important references summarized
- README.md
  - Quick start with pnpm dev, draft/live preview, on-demand revalidation hooks, SEO, search, redirects, scheduled publish via jobs
  - Postgres migration workflow using pnpm payload migrate:create and migrate
  - Optional Docker usage; production build and start flow
- QWEN.md
  - Confirms stack: Next.js + Payload CMS, Postgres DB, S3-compatible storage via Cloudflare R2, Tailwind + shadcn, Lexical editor, production-ready template

Tips for common tasks (repo-specific)
- Generate types/importmap after changing collections or Payload config
  ```bash path=null start=null
  pnpm run generate:types && pnpm run generate:importmap
  ```
- Re-run Playwright only
  ```bash path=null start=null
  pnpm run test:e2e
  ```
- Re-run integration tests only
  ```bash path=null start=null
  pnpm run test:int
  ```
