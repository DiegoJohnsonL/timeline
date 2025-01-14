"use client";

import { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function HeartsAnimation() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="w-full h-full relative">
      
      <DotLottieReact
        src="/floor.lottie"
        autoplay
        loop={true}
        className="absolute bottom-0 left-0"
      />
      <DotLottieReact
        src="/falling.lottie"
        autoplay
        loop={true}
        className="absolute top-0 left-0 opacity-90"
      />
    </div>
  );
}
