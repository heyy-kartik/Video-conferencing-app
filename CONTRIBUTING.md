# Contributing to EZMeet

Thank you for your interest in contributing! This guide will help you make your first open-source contribution to EZMeet — a video-conferencing app built with Next.js, Clerk, and the Stream Video SDK.

---

## Table of Contents

1. [Finding Issues to Work On](#1-finding-issues-to-work-on)
2. [Running the Project Locally](#2-running-the-project-locally)
3. [Code Style Guidelines](#3-code-style-guidelines)
4. [Opening a Pull Request](#4-opening-a-pull-request)

---

## 1. Finding Issues to Work On

- Browse the [Issues tab](../../issues) of this repository.
- Filter by the **`good first issue`** label to find beginner-friendly tasks — these are deliberately scoped to be small and self-contained.
- Also check for issues labeled **`help wanted`** for slightly larger pieces of work where input is welcome.
- If you want to work on an issue, leave a comment asking to be assigned so others know it's being handled.
- Don't see an issue for your idea? [Open a new one](../../issues/new) first to discuss it before writing code.

---

## 2. Running the Project Locally

### Prerequisites

- [Node.js 18+](https://nodejs.org/)
- [pnpm](https://pnpm.io/installation) (recommended) or npm

### Steps

1. **Fork** this repository on GitHub, then clone your fork:

   ```bash
   git clone https://github.com/<your-username>/Video-conferencing-app.git
   cd Video-conferencing-app/my-app
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Set up environment variables:**

   ```bash
   cp .env.example .env.local
   ```

   Open `.env.local` and fill in the required values:

   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=   # from https://dashboard.clerk.com
   CLERK_SECRET_KEY=
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_STREAM_API_KEY=          # from https://getstream.io/dashboard
   STREAM_SECRET_KEY=
   ```

4. **Start the development server:**

   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 3. Code Style Guidelines

This project uses the following tools to keep the code consistent — please make sure your changes pass them before opening a PR.

| Tool | Purpose | Command |
|------|---------|---------|
| **TypeScript** | Type safety | checked automatically on build |
| **ESLint** | Code quality & style | `pnpm lint` |
| **Tailwind CSS** | Styling | use utility classes; avoid custom CSS where possible |

A few conventions to follow:

- Use **TypeScript** for all new files (`.ts` / `.tsx`).
- Keep components small and focused; place them in `src/components/`.
- Use **shadcn/ui** or **Radix UI** primitives for new UI elements rather than introducing additional component libraries.
- Name files and components in **PascalCase** (e.g., `MeetingCard.tsx`).
- Prefer named exports over default exports for components.
- Write clear, concise variable and function names — avoid abbreviations.

---

## 4. Opening a Pull Request

1. Create a new branch from `main` with a descriptive name:

   ```bash
   git checkout -b fix/typo-in-readme
   # or
   git checkout -b feat/add-mute-button
   ```

2. Make your changes, then run the linter to catch issues early:

   ```bash
   pnpm lint
   ```

3. Commit your changes with a clear message:

   ```bash
   git add .
   git commit -m "fix: correct typo in README contributing section"
   ```

4. Push your branch and open a PR against `main`:

   ```bash
   git push origin <your-branch-name>
   ```

5. On GitHub, click **"Compare & pull request"**, fill in the PR template (what you changed and why), and submit.

6. A maintainer will review your PR. Be ready to make small adjustments based on feedback — this is completely normal!

---

## First Contribution Tips

- **Start small.** Fix a typo, improve a comment, or add a missing `.env` variable description. Every contribution counts.
- **Ask questions.** If you're unsure about something, open an issue or leave a comment — the community is here to help.
- **One change per PR.** Focused PRs are reviewed and merged faster.
- **Good first issues** are tagged so maintainers can guide you through them if needed.

---

Thank you for contributing to EZMeet! 🎉
