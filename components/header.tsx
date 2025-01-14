"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function Header() {
  const {data: session} = useSession();
  const router = useRouter();
  const isLoggedIn = !!session?.user;
  const onClick = () => {
    if (isLoggedIn) {
      router.push('/onboarding');
    } else {
      signIn("google", {redirectTo: "/onboarding"});
    }
  }
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-xl font-bold">
            MemoryTrail
          </Link>
        </div>
        <nav className="hidden md:flex gap-6">
          <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
            Features
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium hover:underline underline-offset-4">
            How It Works
          </Link>
          <Link href="#pricing" className="text-sm font-medium hover:underline underline-offset-4">
            Pricing
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button onClick={onClick}>Get Started</Button>
        </div>
      </div>
    </header>
  );
}
