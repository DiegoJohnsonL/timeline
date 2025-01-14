"use client"

import { Button } from "@/components/ui/button"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
  
export default function Hero() {
  const {data: session} = useSession();
  const isLoggedIn = !!session?.user;
  const router = useRouter();
  const onClick = () => {
    if (isLoggedIn) {
      router.push('/onboarding');
    } else {
      signIn("google", {redirectTo: "/onboarding"});
    }
  }
  return (
    <section className="relative py-24 md:py-32">
      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Your journey of love, beautifully remembered.
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Create a timeline of your relationship milestones and visualize them on an interactive map. 
            Celebrate your special moments together in a unique and meaningful way.
          </p>
          <div className="mt-10 flex items-center justify-center gap-6">
            <Button size="lg" onClick={onClick}>Get Started for Free</Button>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 bg-[url('/placeholder.svg')] opacity-20" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background to-background/60" />
    </section>
  )
}

