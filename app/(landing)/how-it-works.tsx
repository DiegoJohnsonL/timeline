import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, PenLine, Share2 } from 'lucide-react'

const steps = [
  {
    title: "Upload your favorite photos",
    description: "Simply select and upload your cherished memories",
    icon: Upload,
  },
  {
    title: "Add dates and details",
    description: "Include dates, descriptions, and locations for each moment",
    icon: PenLine,
  },
  {
    title: "Share your story",
    description: "Share, download, or print your timeline and map",
    icon: Share2,
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Create Your Story in Minutes</h2>
          <p className="text-muted-foreground">Three simple steps to bring your memories to life.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <Card key={step.title} className="text-center">
              <CardHeader>
                <div className="mx-auto rounded-full bg-primary/10 p-4 mb-4">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>
                  <span className="text-primary mr-2">{index + 1}.</span>
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

