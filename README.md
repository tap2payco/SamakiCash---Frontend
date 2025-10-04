# SamakiCash PWA Frontend

A progressive web app (PWA) frontend for **SamakiCash** — a platform for fishers — built with Next.js (App Router), React, Tailwind CSS, and TypeScript.

## Features

- **PWA installability**: Manifest and service worker for offline support.
- **Responsive design**: Mobile-first, clean modern look with soft blues & greens.
- **User authentication**: Login and signup with email/password.
- **Dashboard**: Quick add catch form (fish type, quantity, location, photo upload), recommended price, and voice message link.
- **Credit Score**: Simulated credit score display and loan application.
- **Insurance**: Get quotes, view premium/coverage, and buy insurance.
- **History**: View previous catches and transactions.
- **Profile/Settings**: Manage user profile and app settings.
- **Global navigation**: Bottom navigation for mobile.
- **API integration**: Connects to FastAPI backend at `http://localhost:8000`.
- **Loading/error states**: Friendly UI with cards, modals, and alerts.
- **Offline mode**: Caches last successful data fetch for use when offline.

## Tech Stack

- [Next.js 14+ (App Router)](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [next-pwa](https://github.com/shadowwalker/next-pwa) or Workbox for service worker

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the development server:**
   ```bash
   npm run dev
   ```
3. **Build for production:**
   ```bash
   npm run build
   ```

## API Endpoints

- `POST /api/analyze-catch`
- `POST /api/credit-score`
- `POST /api/insurance-quote`
- `GET /audio/{filename}`

## Deployment

Ready to deploy on [Vercel](https://vercel.com/).

## License

MIT