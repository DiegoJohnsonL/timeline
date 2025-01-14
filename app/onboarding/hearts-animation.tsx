'use client'

import { useEffect, useState } from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function HeartsAnimation() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <DotLottieReact
      src="/hearts.lottie"
      autoplay
      loop={true}
      style={{ width: '300px', height: '300px' }}
    />
  )
}

