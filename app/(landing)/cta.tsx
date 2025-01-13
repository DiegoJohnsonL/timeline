import { Button } from "@/components/ui/button"

export default function CTA() {
  return (
    <section className="relative py-24">
      <div className="container relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Ready to Celebrate Your Journey?
          </h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of couples who are already preserving their precious memories with MemoryTrail.
          </p>
          <Button size="lg">Start Your MemoryTrail Today</Button>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 bg-[url('/placeholder.svg')] opacity-20" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background to-background/60" />
    </section>
  )
}

