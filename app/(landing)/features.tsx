import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Map, Palette, Share, Sparkles } from 'lucide-react'

const features = [
  {
    title: "Interactive Timeline",
    description: "Document milestones with photos, dates, and personal stories.",
    icon: Clock,
  },
  {
    title: "Memory Map",
    description: "Pin your moments to a map and visualize your journey together.",
    icon: Map,
  },
  {
    title: "Custom Themes",
    description: "Choose designs that reflect your relationship's style.",
    icon: Palette,
  },
  {
    title: "Easy Sharing",
    description: "Share your timeline and map with loved ones or export for printing.",
    icon: Share,
  },
  {
    title: "Smart Suggestions",
    description: "Auto-suggest locations and events from photo metadata.",
    icon: Sparkles,
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24  bg-white ">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Why Choose MemoryTrail?</h2>
          <p className="text-muted-foreground">Everything you need to capture and celebrate your special moments.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

