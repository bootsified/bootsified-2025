#!/usr/bin/env bash
set -euo pipefail

echo "Starting safe dependency upgrade workflow"

BRANCH="chore/upgrade-deps-$(date +%Y%m%d%H%M%S)"

echo "Creating branch $BRANCH"
git checkout -b "$BRANCH"

echo "Installing dependencies and updating lockfile (this may take a minute)"
npm install

echo "Running tests"
npm test || { echo "Tests failed — aborting"; exit 1; }

echo "Building project"
npm run build || { echo "Build failed — aborting"; exit 1; }

echo "Running linter"
npm run lint || { echo "Lint step failed — please fix warnings/errors and re-run"; exit 1; }

echo "Running npm audit (report)"
npm audit --audit-level=moderate || true

echo "Committing lockfile and package.json"
git add package.json package-lock.json
git commit -m "chore: bump dependencies (safe upgrades)" || echo "No changes to commit"

echo "Push branch and open a PR from your fork or origin"
git push -u origin "$BRANCH"

echo "Upgrade script finished. Create a PR with the branch and include UPGRADE_PLAN.md notes."
