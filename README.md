This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Managing Videos

Videos are hosted on Vercel Blob storage. To add or update videos:

### Upload a new video:

**Option 1: Using Vercel CLI (recommended)**
```bash
vercel blob put path/to/your-video.mp4
```

**Option 2: Using Vercel Dashboard**
1. Go to your project on Vercel
2. Navigate to Storage → Blob
3. Upload your video file

### Add video to your project:
1. Copy the generated Blob URL (e.g., `https://xxxxx.public.blob.vercel-storage.com/videos/your-video.mp4`)
2. Paste the full URL into your project's `media` field in the database or admin panel
3. The video will automatically work in project modals and other components

**Note:** Always use the full Blob URL, not a relative path. External URLs (YouTube, SoundCloud) are also supported.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
