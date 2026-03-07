# Architecture Pivot Plan

## Goal

Restructure routing so that:

- `/` → Public **landing page** (hero-section)
- `/home` → Authenticated **dashboard** (meetings, sidebar, navbar)
- "Get Started" on landing page → navigates to `/home` (Clerk middleware handles auth)

---

## Current State

| Route              | What it does                              |
| ------------------ | ----------------------------------------- |
| `/`                | Renders `HeroSectionDemo` (landing page)  |
| `/home`            | Dashboard with time/date + meeting cards  |
| `/home/upcoming`   | Upcoming meetings list                    |
| `/home/previous`   | Previous meetings list                    |
| `/home/recordings` | Recordings list                           |
| `/home/personal-room` | Personal room                          |
| `/meeting/[id]`    | Active meeting room                       |

The `(home)` route group has already been renamed to `home` (a real URL segment). ✅

---

## Changes Required (in order)

### 1. Fix `src/app/page.tsx` — Default Export

Next.js **requires a default export** for page files. Currently it only has a named export `HeroSectionDemo`. Add `export default` or change to default export.

### 2. Update "Get Started" href

In `src/app/page.tsx`, change the "Get Started" action href:

```
"/sign-in"  →  "/home"
```

**Why `/home` and not `/sign-in`?** Clerk middleware will intercept unauthenticated users hitting `/home` and redirect them to `/sign-in` automatically. After sign-in, Clerk redirects them back to `/home`. This gives a seamless UX without hardcoding auth routes.

### 3. Update Sidebar Routes — `src/constants/index.ts`

All sidebar links need the `/home` prefix:

| Old Route          | New Route               |
| ------------------ | ----------------------- |
| `/`                | `/home`                 |
| `/upcoming`        | `/home/upcoming`        |
| `/previous`        | `/home/previous`        |
| `/recordings`      | `/home/recordings`      |
| `/personal-room`   | `/home/personal-room`   |

### 4. Update All `router.push()` Calls

| File                          | Old                         | New                          |
| ----------------------------- | --------------------------- | ---------------------------- |
| `Meetingstyle.tsx`            | `router.push("/recordings")`| `router.push("/home/recordings")` |
| `MeetingRoom.tsx`             | `router.push("/")`          | `router.push("/home")`       |
| `Endbutton.tsx`               | `router.push("/")`          | `router.push("/home")`       |

> **Note:** `Calllist.tsx` pushes to `/meeting/...` which stays unchanged since meeting routes are still at `/meeting/[id]`.

### 5. Add/Update Clerk Middleware — `src/middleware.ts`

Create a Clerk middleware file that:

- **Public routes:** `/`, `/sign-in`, `/sign-up`, `/api/(.*)` (landing page + auth pages)
- **Protected routes:** Everything else (`/home/*`, `/meeting/*`)

Unauthenticated users hitting `/home` will be redirected to `/sign-in`.

### 6. Configure Clerk Redirect URLs

In `src/app/layout.tsx` (ClerkProvider), add:

- `signInForceRedirectUrl: "/home"` — After sign-in → go to dashboard
- `signUpForceRedirectUrl: "/home"` — After sign-up → go to dashboard
- `afterSignOutUrl: "/"` — After sign-out → go to landing page

### 7. Check Navbar Logo Link

The Navbar likely has a logo that links to `/`. Update it to link to `/home` so that authenticated users navigate back to the dashboard (not the landing page).

---

## Architecture Diagram

```
src/app/
├── page.tsx                          ← Landing page (public, no auth)
├── layout.tsx                        ← ClerkProvider (wraps everything)
├── (auth)/
│   ├── sign-in/[[...sign-in]]/page.tsx
│   └── sign-up/[[...sign-up]]/page.tsx
├── (root)/                           ← Route group (no URL segment)
│   ├── layout.tsx                    ← StreamVideoProvider
│   ├── home/                         ← Real URL segment: /home
│   │   ├── layout.tsx                ← Navbar + Sidebar
│   │   ├── page.tsx                  ← Dashboard
│   │   ├── upcoming/page.tsx
│   │   ├── previous/page.tsx
│   │   ├── recordings/page.tsx
│   │   └── personal-room/page.tsx
│   └── meeting/[id]/page.tsx         ← Meeting room
```

Key insight: `/` (landing page) sits **outside** `(root)`, so it does **NOT** load `StreamVideoProvider`. This is correct — the landing page doesn't need video SDK.

---

## Edge Cases

| Scenario                              | Behavior                                      |
| ------------------------------------- | --------------------------------------------- |
| Unauthenticated user visits `/home`   | Clerk middleware → redirect to `/sign-in`      |
| User signs in                         | Clerk → redirect to `/home`                   |
| User signs out                        | Clerk → redirect to `/` (landing page)         |
| User leaves a meeting                 | `router.push("/home")` → back to dashboard     |
| Host ends call for everyone           | `router.push("/home")` → back to dashboard     |
| Direct URL `/home/recordings`         | If not authed → sign-in → back to recordings   |

---

## Files to Modify (Summary)

1. `src/app/page.tsx` — Fix default export + update "Get Started" href
2. `src/constants/index.ts` — Prefix all sidebar routes with `/home`
3. `src/components/Meetingstyle.tsx` — Update `/recordings` push
4. `src/components/MeetingRoom.tsx` — Update `/` push to `/home`
5. `src/components/Endbutton.tsx` — Update `/` push to `/home`
6. `src/middleware.ts` — Create Clerk auth middleware *(new file)*
7. `src/app/layout.tsx` — Add Clerk redirect URLs
8. `src/components/Navbar.tsx` — Update logo link to `/home`

---

## Order of Execution

1. Fix `page.tsx` (default export + href)
2. Create `middleware.ts`
3. Update ClerkProvider redirect config
4. Update `constants/index.ts` sidebar routes
5. Update all `router.push()` calls (3 files)
6. Update Navbar logo link
7. **Test the full flow:** Landing → Get Started → Sign In → Dashboard → Navigate sidebar → Meeting → Leave → Dashboard → Sign Out → Landing
