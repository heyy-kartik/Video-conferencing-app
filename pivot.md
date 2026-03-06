# Architecture Pivot Plan: Landing Page & Protected Dashboard

## Objective
To separate the public-facing landing page (HeroSection) from the protected video conferencing dashboard (`(home)`) while ensuring smooth authentication routing using Clerk.

## The Routing Conflict
Currently, you have a route collision:
- `src/app/page.tsx` resolves to `/`
- `src/app/(root)/(home)/page.tsx` also resolves to `/` (because route groups strictly inside parentheses do not affect the URL path).

Next.js will throw a build/runtime error if two `page.tsx` files map to the same route. We need to split them into a "Public Root" and a "Protected Dashboard".

## Proposed Architecture

1. **Public Route (`/`)**
   - **File**: `src/app/page.tsx`
   - **Purpose**: Render the `HeroSection` (Marketing/Landing Page).
   - **Action**: "Get Started" button navigates to `/sign-in`.

2. **Protected Route (`/dashboard` or `/home`)**
   - **File Restructure**: Rename the `(home)` route group to an actual semantic route like `dashboard`.
   - **New Path**: `src/app/(root)/dashboard/page.tsx` (resolves to `/dashboard`).
   - **Purpose**: Show the user's upcoming meetings, join links, and user login profile data.

3. **Authentication Wall (`/sign-in` & `/sign-up`)**
   - **File**: `src/app/(auth)/...`
   - **Purpose**: Clerk handles login. After sign-in, redirect the user to `/dashboard`.

## Step-by-Step Implementation Plan

### Step 1: Fix Route Mapping
- Move or rename the `(home)` folder to an explicit route. 
- *Example*: Rename `src/app/(root)/(home)` to `src/app/(root)/dashboard`.
- Repeat this for any specific subpages inside `(home)` (like `personal-room`, `previous`, etc.), so they become `/dashboard/personal-room`, etc.

### Step 2: Configure the Landing Page
- Keep `src/app/page.tsx` as your landing page with the `HeroSection`.
- Ensure the "Get Started" array points to `/sign-in`.

### Step 3: Configure Clerk Middleware
- Open your `middleware.ts`.
- Ensure the root route `/` is explicitly marked as a **publicRoute**.
- Ensure all dashboard and meeting routes (e.g., `/dashboard(.*)`, `/meeting(.*)`) are **protected**.

### Step 4: Environment Variables Update
- Modify your `.env.local` to tell Clerk where to send users after they successfully log in from the landing page:
  ```env
  NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
  NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
  NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
  NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard