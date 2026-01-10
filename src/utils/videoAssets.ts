// Import all videos as next-video Assets
import { Asset } from 'next-video/dist/assets.js'

import mizzenVideo from 'videos/mizzen-walkthrough-web.mp4'
import adoptedVideo from 'videos/adopted-walkthrough-web.mp4'
import theLaurelVideo from 'videos/thelaurel-walkthrough-web.mp4'
import falchiVideo from 'videos/falchi-walkthrough-web.mp4'
import hingeVideo from 'videos/hinge-walkthrough-web.mp4'
import pregnancyHotlineVideo from 'videos/pregnancyhotline-walkthrough-web.mp4'
import doublerVideo from 'videos/doubler-walkthrough-web.mp4'

// Map video paths to their imported Assets
const videoAssets: Record<string, Asset> = {
  '/videos/mizzen-walkthrough-web.mp4': mizzenVideo,
  'videos/mizzen-walkthrough-web.mp4': mizzenVideo,
  '/videos/adopted-walkthrough-web.mp4': adoptedVideo,
  'videos/adopted-walkthrough-web.mp4': adoptedVideo,
  '/videos/thelaurel-walkthrough-web.mp4': theLaurelVideo,
  'videos/thelaurel-walkthrough-web.mp4': theLaurelVideo,
  '/videos/falchi-walkthrough-web.mp4': falchiVideo,
  'videos/falchi-walkthrough-web.mp4': falchiVideo,
  '/videos/hinge-walkthrough-web.mp4': hingeVideo,
  'videos/hinge-walkthrough-web.mp4': hingeVideo,
  '/videos/pregnancyhotline-walkthrough-web.mp4': pregnancyHotlineVideo,
  'videos/pregnancyhotline-walkthrough-web.mp4': pregnancyHotlineVideo,
  '/videos/doubler-walkthrough-web.mp4': doublerVideo,
  'videos/doubler-walkthrough-web.mp4': doublerVideo,
}

/**
 * Get the next-video Asset for a given video path
 * Returns the Asset if it's a local video file, or the original string if it's an external URL
 */
export function getVideoAsset(path: string): Asset | string {
  if (!path) return ''
  
  // If it's an external URL (YouTube, SoundCloud, etc.), return as-is
  if (path.startsWith('http')) {
    return path
  }
  
  // Look up the video asset
  return videoAssets[path] || path
}
