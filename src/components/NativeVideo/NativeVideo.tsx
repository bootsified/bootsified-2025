'use client'

import React, { forwardRef, VideoHTMLAttributes } from 'react'

interface NativeVideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
  src: string
  poster?: string
}

const NativeVideo = forwardRef<HTMLVideoElement, NativeVideoProps>(
  ({ src, poster, children, ...props }, ref) => {
    return (
      <video ref={ref} poster={poster} {...props}>
        <source src={src} type="video/mp4" />
        {children}
        Your browser does not support the video tag.
      </video>
    )
  }
)

NativeVideo.displayName = 'NativeVideo'

export default NativeVideo
