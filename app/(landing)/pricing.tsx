"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState, useRef } from "react";
import NumberFlow from "@number-flow/react";
import confetti from "canvas-confetti";
import { signIn } from "next-auth/react";

export default function Pricing() {
  const [isMonthly, setIsMonthly] = useState(true);
  const switchRef = useRef<HTMLButtonElement>(null);

  const handleToggle = (checked: boolean) => {
    setIsMonthly(!checked);
    if (checked && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      confetti({
        particleCount: 50,
        spread: 60,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
        colors: ["hsl(var(--primary))", "hsl(var(--accent))", "hsl(var(--secondary))", "hsl(var(--muted))"],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["circle"],
      });
    }
  };

  return (
    <section className="py-24 container">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Simple, Transparent Pricing</h2>
        <p className="text-muted-foreground text-lg">
          Choose the plan that works for you
          <br />
          All plans include access to our platform, lead generation tools, and dedicated support.
        </p>
      </div>

      <div className="flex justify-center mb-10">
        <label className="relative inline-flex items-center cursor-pointer">
          <Label>
            <Switch ref={switchRef} checked={!isMonthly} onCheckedChange={handleToggle} className="relative" />
          </Label>
        </label>
        <span className="ml-2 font-semibold">
          Annual billing <span className="text-primary">(Save 20%)</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {[
          {
            name: "FREE",
            price: "0",
            yearlyPrice: "0",
            period: "forever",
            features: [
              "Basic timeline features",
              "Simple map integration",
              "Up to 50 memories",
              "Basic sharing options",
            ],
            description: "Perfect for getting started",
            buttonText: "Get Started",
            href: "/sign-up",
            isPopular: false,
          },
          {
            name: "PREMIUM",
            price: "9.99",
            yearlyPrice: "7.99",
            period: "per month",
            features: [
              "Advanced timeline features",
              "Custom themes",
              "Unlimited memories",
              "Video exports",
              "Printable designs",
              "Priority support",
            ],
            description: "For serious memory collectors",
            buttonText: "Coming Soon",
            isPopular: true,
          },
        ].map((plan, index) => (
          <motion.div
            key={index}
            viewport={{ once: true }}
            transition={{
              duration: 1.6,
              type: "spring",
              stiffness: 100,
              damping: 30,
              delay: 0.4,
              opacity: { duration: 0.5 },
            }}
            className={cn(
              `rounded-2xl border-[1px] p-6 bg-background text-center lg:flex lg:flex-col lg:justify-center relative`,
              plan.isPopular ? "border-primary border-2" : "border-border",
              "flex flex-col",
              index === 0 || index === 2
                ? "z-0 transform translate-x-0 translate-y-0 -translate-z-[50px] rotate-y-[10deg]"
                : "z-10",
              index === 0 && "origin-right",
              index === 2 && "origin-left"
            )}
          >
            <div className="flex-1 flex flex-col">
              <p className="text-base font-semibold text-muted-foreground">{plan.name}</p>
              <div className="mt-6 flex items-center justify-center gap-x-2">
                <span className="text-5xl font-bold tracking-tight text-foreground">
                  <NumberFlow
                    value={isMonthly ? Number(plan.price) : Number(plan.yearlyPrice)}
                    format={{
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }}
                    transformTiming={{
                      duration: 500,
                      easing: "ease-out",
                    }}
                    willChange
                    className="font-variant-numeric: tabular-nums"
                  />
                </span>
                {plan.period !== "Next 3 months" && (
                  <span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">
                    / {plan.period}
                  </span>
                )}
              </div>

              <p className="text-xs leading-5 text-muted-foreground">
                {isMonthly ? "billed monthly" : "billed annually"}
              </p>

              <ul className="mt-5 gap-2 flex flex-col">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <hr className="w-full my-4" />
              </div>

              <Button
                  onClick={() => {
                    if (plan.href) {
                      signIn("google", {redirectTo: "/home"})
                    }
                  }}
                  disabled={plan.href ? false : true}
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                    }),
                    "group relative w-full gap-2 overflow-hidden text-lg font-semibold tracking-tighter",
                    "transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-1 hover:bg-primary hover:text-primary-foreground",
                    plan.isPopular ? "bg-primary text-primary-foreground" : "bg-background text-foreground"
                  )}
                >
                  {plan.buttonText}
                </Button>
              <p className="mt-6 text-xs leading-5 text-muted-foreground">{plan.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
