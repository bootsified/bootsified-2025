# BOOTS!

https://boots.dev

Howdy! This is the repo for my personal website. It's built with [Next.js](https://nextjs.org/) and hosted on [Vercel](https://vercel.com/). Feel free to look around, and [let me know](https://boots.dev/contact) if you need anything.

Take care! :wave:

-- Boots

## Getting started

Copy the example environment and install dependencies:

1. Copy `.env.example` to `.env.local` and fill in secrets (do NOT commit `.env.local`).
2. Install dependencies: `npm install`.
3. Run the dev server: `npm run dev`.
4. To seed local DB (Prisma + Postgres): `npm run seed` (ensure `DATABASE_URL` is set).
5. Lint and format: `npm run lint` and use `prettier` as needed.
6. Run tests: `npm test` or `npm run test:watch`.

For deployment, this project targets Vercel. See `next.config.mjs` and `prisma` for DB settings.
