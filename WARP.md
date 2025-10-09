# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project summary
- Next.js 14 (App Router) + TypeScript + Tailwind CSS PWA frontend for SamakiCash.
- Package manager: npm (per README). A pnpm-lock.yaml exists but npm is the intended tool; avoid mixing lockfiles.

Core commands
- Install dependencies
  - npm install
- Start dev server (http://localhost:3000)
  - npm run dev
- Build production bundle
  - npm run build
- Start production server (after build)
  - npm start
- Lint (Next.js/ESLint)
  - npm run lint
- Type-check (no script defined)
  - npx tsc --noEmit
- Clear Next.js cache if builds behave unexpectedly
  - rm -rf .next && npm run build

Environment
- Create a .env.local file in the repo root. Commonly used variables (as referenced in README and next.config.mjs):
  - NEXT_PUBLIC_API_BASE_URL
  - NEXT_PUBLIC_MISTRAL_AI_API_KEY
  - NEXT_PUBLIC_ELEVENLABS_API_KEY
  - NEXT_PUBLIC_NEBIUS_AI_API_KEY
  - NEXT_PUBLIC_AIML_API_KEY
  - NEXT_PUBLIC_GA_MEASUREMENT_ID (optional)
- Note: next.config.mjs maps API_BASE_URL from NEXT_PUBLIC_API_BASE_URL and configures headers for /manifest.json.

Testing
- No test runner is configured in package.json and no Jest/Vitest config files are present. Running a single test is not applicable until a test framework is added.

Architecture overview
- Framework/runtime
  - Next.js 14 App Router with TypeScript. tsconfig.json is strict, noEmit, bundler module resolution, and defines the alias @/* to project root.
  - Tailwind CSS v4 is used (see devDependencies). Styling is via Tailwind with Radix UI primitives.
- App structure (from README and conventions)
  - app/: App Router entrypoint, with routes and an api/ subtree (e.g., api/chat) and root layout.tsx/globals.css.
  - components/: Reusable UI components, including UI primitives, navigation, analytics, PWA install prompt, and chatbot UI.
  - lib/: Client-side utilities and service layer, e.g., api.ts (typed API calls), auth.ts, utils.ts.
  - public/: Static assets including manifest.json and PWA assets (icons, service worker if provided).
  - Configuration: next.config.mjs, tsconfig.json, tailwind configuration (via Tailwind v4), and package.json scripts.
- Next.js configuration highlights (next.config.mjs)
  - ESLint and TypeScript errors are ignored during builds (eslint.ignoreDuringBuilds, typescript.ignoreBuildErrors). Be aware this permits builds to pass with lint/type issues.
  - images: unoptimized: true and domains: ['localhost'].
  - headers(): sets Cache-Control for /manifest.json.
  - env: API_BASE_URL is sourced from NEXT_PUBLIC_API_BASE_URL with a default to http://localhost:8000.

Deployment note (from README)
- Typical build/start commands: npm install && npm run build, then npm start. The README documents Render as a target; Vercel/Netlify are also compatible with Next.js.

Guidance for future work in this repo
- Use npm consistently (avoid pnpm/yarn to prevent lockfile drift). Prefer npm ci in CI when package-lock.json is present.
- Ensure .env.local is present locally and required NEXT_PUBLIC_* variables are set before running dev or build.
- If adding tests, decide on Vitest or Jest and add scripts accordingly (e.g., "test", "test:watch").
