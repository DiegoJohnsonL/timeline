'use client'

import { useEffect, useState } from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function LoadingAnimation({ onComplete }: { onComplete: () => void }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    setTimeout(() => {
      onComplete()
    }, 5000)
  }, [])

  if (!isClient) return null

  return (
    <DotLottieReact
      src="/cat-loading.lottie"
      autoplay
      loop={true}
      onAnimationEnd={onComplete}
      style={{ width: '300px', height: '300px' }}
    />
  )
}

