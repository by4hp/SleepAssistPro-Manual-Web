# SleepAssistPro Manual Web

[中文](./README.zh-CN.md) | **English**

## Overview

This is the `SleepAssistPro` manual website, built with `Next.js`.

The site is used to:

- present the Chinese user manual
- organize onboarding, daily usage, settings, account security, and troubleshooting by chapter
- pair screenshots with in-app instructions and step-by-step guidance

## Local Development

Run the development server from the project root:

```bash
pnpm dev
```

Then open:

```text
http://localhost:3000
```

## Useful Commands

```bash
pnpm dev
pnpm build
pnpm start
npx tsc --noEmit
```

## Asset Strategy

By default, manual screenshots are loaded from the local `public/manual` directory, so local preview works without any extra setup.

If screenshots are moved to external hosting later, add this to `.env.local`:

```bash
NEXT_PUBLIC_MANUAL_ASSET_BASE_URL=https://your-asset-host
```

When this variable is set, any asset path starting with `/manual/` will be resolved against that external host.

If the variable is not set, the app will continue using local assets.

## Deployment

This project can be deployed directly on `Vercel`.

If production images are hosted externally, make sure to also configure this environment variable in Vercel:

```bash
NEXT_PUBLIC_MANUAL_ASSET_BASE_URL
```

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
