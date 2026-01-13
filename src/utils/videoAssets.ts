/**
 * Video asset utility for handling video URLs
 * 
 * Store full Vercel Blob URLs directly in the database `media` field:
 * Example: https://xxxxx.public.blob.vercel-storage.com/videos/example-video.mp4
 * 
 * To upload videos to Vercel Blob:
 * 1. Using Vercel CLI: `vercel blob put path/to/video.mp4`
 * 2. Using Vercel Dashboard: Go to Storage → Blob, upload files
 * 3. Copy the generated URL and paste it into your project's media field
 * 
 * External URLs (YouTube, SoundCloud) are also supported.
 */
export function getVideoAsset(videoPath: string): string {
  return videoPath || ''
}
