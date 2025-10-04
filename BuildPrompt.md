Build a progressive web app (PWA) frontend for SamakiCash — a platform for fishers — using Next.js (App Router) with React, Tailwind CSS, and TypeScript.

General Requirements

Must be installable as a PWA (manifest + service worker).

Responsive design (mobile-first).

Use Tailwind for styling with a clean modern look (soft blues & greens as brand colors).

Integrate with backend API endpoints at http://localhost:8000 (FastAPI server).

Provide pages/components for:

Login/Signup (email + password)

Dashboard with:

Quick add catch form (fish type, quantity, location, upload photo)

Display recommended price & voice message link

Credit Score Page:

Show simulated credit score from /api/credit-score

“Apply for Loan” button (simulate sending to partner bank)

Insurance Page:

Get quote from /api/insurance-quote

Show premium + coverage, “Buy Now” button

History Page: show previous catches and transactions

Settings/Profile

Add simple global navigation (bottom nav on mobile).

Show API responses in a friendly UI (cards, modals).

Include loading states and error handling.

Add a simple offline mode (cache last successful data fetch).

Technical Details

Use Next.js 14+ with App Router.

Setup next-pwa or workbox for service worker and offline caching.

Generate and link manifest.json (icon, name, themeColor).

Store user auth token (simulate) in localStorage.

Use React Hooks for API calls (fetch).

Use TypeScript interfaces for API responses.

Example API Endpoints

POST /api/analyze-catch

POST /api/credit-score

POST /api/insurance-quote

GET /audio/{filename}

Deliverables

Fully functional Next.js app with all above pages/components.

Manifest.json & service worker configured for installability.

Tailwind styling consistent across pages.

Ready to deploy to Vercel.