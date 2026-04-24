# Video Conferencing App (EZMeet)

A modern video conferencing platform built with **Next.js**, **Clerk**, and **Stream Video SDK**.  
It supports secure authentication, instant/scheduled meetings, personal rooms, recordings, and a responsive meeting UI.

## Table of Contents

- [Overview](#overview)
- [Core Features](#core-features)
- [Tech Stack](#tech-stack)
- [Repository Structure](#repository-structure)
- [App Routes](#app-routes)
- [Local Development Setup](#local-development-setup)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Deployment Notes](#deployment-notes)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## Overview

This repository contains a Next.js application in the `my-app/` directory.  
The app uses Clerk for authentication and Stream for real-time video calling infrastructure.

## Core Features

- 🎥 Create and join real-time video meetings
- 🔐 Protected routes with Clerk authentication
- 📅 Schedule meetings for later
- 🏠 Personal room with shareable invite link
- 📼 Browse upcoming, previous, and recorded meetings
- ⌨️ Keyboard Echo utility page (`/home/keyboard`)
- 🎨 Modern UI using Tailwind CSS + shadcn/ui + Radix primitives

## Tech Stack

| Technology | Purpose |
| --- | --- |
| Next.js 16 + App Router | Web framework and routing |
| React 19 + TypeScript | UI and type safety |
| Tailwind CSS 4 | Styling |
| Clerk | Auth and user management |
| Stream Video SDK | Video calling and call state |
| shadcn/ui + Radix UI | Reusable accessible UI components |
| Sonner | Toast notifications |

## Repository Structure

```text
Video-conferencing-app/
├── README.md
├── CONTRIBUTING.md
└── my-app/
    ├── package.json
    ├── src/
    │   ├── app/
    │   │   ├── (auth)/                # sign-in/sign-up pages
    │   │   └── (root)/                # authenticated pages
    │   │       ├── home/
    │   │       └── meeting/[id]/
    │   ├── actions/                   # server-side actions (Stream token provider)
    │   ├── components/                # app + UI components
    │   ├── constants/
    │   ├── hooks/
    │   └── lib/
    └── public/                        # static assets/icons/images
```

## App Routes

### Public

- `/` — Landing page
- `/sign-in` — Sign in flow (Clerk)
- `/sign-up` — Sign up flow (Clerk)

### Authenticated

- `/home` — Dashboard
- `/home/upcoming` — Upcoming meetings
- `/home/previous` — Previous meetings
- `/home/recordings` — Call recordings
- `/home/personal-room` — Personal room management
- `/home/keyboard` — Keyboard Echo feature
- `/meeting/[id]` — Meeting setup and room

## Local Development Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/heyy-kartik/Video-conferencing-app.git
   cd Video-conferencing-app/my-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

   > You can also use `pnpm install` if preferred.

3. **Create local environment file**

   Create `my-app/.env.local` and add the variables listed below.

4. **Start the dev server**

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

Create `my-app/.env.local`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_STREAM_API_KEY=
STREAM_SECRET_KEY=
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Where they are used

- Clerk keys + auth URLs: authentication and protected routes
- Stream keys: server token generation in `src/actions/stream.actions.ts`
- `NEXT_PUBLIC_BASE_URL`: building shareable meeting URLs

## Available Scripts

Run from `my-app/`:

- `npm run dev` — start development server
- `npm run lint` — run ESLint
- `npm run build` — create production build
- `npm run start` — run production server

## Deployment Notes

- Set the same environment variables in your hosting provider (for example, Vercel).
- Use the deployed domain value for `NEXT_PUBLIC_BASE_URL`.
- Ensure Clerk and Stream dashboard settings allow your deployed domain.

## Troubleshooting

- **App boots but auth fails**: verify Clerk publishable/secret keys and sign-in/sign-up URLs.
- **Cannot create/join calls**: verify Stream API key/secret and project configuration.
- **Invite links point to wrong domain**: set `NEXT_PUBLIC_BASE_URL` correctly.
- **Build fails in restricted network environments**: Google Font fetches can fail if outbound requests are blocked.

## Contributing

Contributions are welcome.  
Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a pull request.

## Acknowledgments

- [Stream](https://getstream.io/) for video infrastructure
- [Clerk](https://clerk.com/) for authentication
- [shadcn/ui](https://ui.shadcn.com/) for UI components
