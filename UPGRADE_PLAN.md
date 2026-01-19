# Dependency upgrade plan

Goal: safely apply the non-breaking dependency bumps already made to `package.json`, update the lockfile locally, run tests/build, and open a PR containing `package.json` + `package-lock.json` changes.

Summary of direct packages to bump (from `npm outdated`):
- `@prisma/client`: ^6.19.2 (wanted) — consider full upgrade to Prisma 7.x in a separate PR
- `prisma` (dev): ^6.19.2 (wanted)
- `framer-motion`: ^12.27.0
- `resend`: ^6.7.0
- `vercel`: ^50.4.5 (note: `vercel` can add many transitive deps; consider moving to `devDependencies`)
- `@typescript-eslint/*`: ^8.53.0
- `eslint-config-next`: 16.1.3
- `prettier`: ^3.8.0
- `@types/node`, `@types/react`, `@types/react-dom` have newer patch versions

High-level steps (safe, local):

1. Create a new branch for the upgrade:
   git checkout -b chore/upgrade-deps

2. Install dependencies and update lockfile locally:
   npm install

3. Run the test and lint suite:
   npm test
   npm run build
   npm run lint

4. Run security audit and address remaining high vulnerabilities (manual review):
   npm audit

5. If everything passes, commit lockfile and package.json changes:
   git add package.json package-lock.json
   git commit -m "chore: bump deps (safe upgrades)"
   git push -u origin chore/upgrade-deps

6. Open a PR and verify CI runs (build, lint, test). If CI fails, debug and fix changes locally.

Notes & recommendations:
- `vercel` is a large package with many transitive dependencies flagged by `npm audit`. Consider moving it to `devDependencies` (it's primarily a deploy/CLI tool) or removing it if unused at runtime.
- Major upgrades (Prisma 7, Next major/minor changes beyond `wanted`) should be done in separate PRs with focused testing: database migration plan for Prisma, and review Next release notes for app-router changes.
- After upgrading `@prisma/client`/`prisma`, run `npx prisma generate` and re-run any Prisma-related scripts and migrations.
- If you use Vercel Blob or `@vercel/*` packages, pay attention to transitive vulnerabilities reported by `npm audit` — some fixes require major-version bumps in `vercel` packages.

Rollback plan:
- If tests or build fail after the upgrade, checkout the base branch and revert the lockfile changes: `git checkout main -- package-lock.json package.json`.

Checklist to include in PR description:
- Why the bumps were applied
- Test results (unit tests passing, build status)
- Any manual checks performed (`npm audit` remaining findings and plan)
- Next steps for major upgrades (Prisma 7, large transitive fixes)

If you'd like, run the helper script `scripts/upgrade-safely.sh` included in this repo which automates these steps locally.
