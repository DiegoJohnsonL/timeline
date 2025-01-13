import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    quote: "MemoryTrail made our anniversary unforgettable!",
    author: "Sarah & Mark",
    image: "/placeholder.svg",
  },
  {
    quote: "The map feature brought our memories to life!",
    author: "Alex & Jamie",
    image: "/placeholder.svg",
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">What Couples Are Saying</h2>
          <p className="text-muted-foreground">Join thousands of happy couples preserving their memories.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.author}>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={testimonial.image} alt={testimonial.author} />
                    <AvatarFallback>{testimonial.author[0]}</AvatarFallback>
                  </Avatar>
                  <blockquote className="text-xl italic">"{testimonial.quote}"</blockquote>
                  <p className="font-medium">— {testimonial.author}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

