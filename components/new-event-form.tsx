"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface NewEventFormProps {
  onSubmit: (data: {
    title: string
    date: Date
    location: string
    description: string
  }) => Promise<void>
}

export function NewEventForm({ onSubmit }: NewEventFormProps) {
  const [title, setTitle] = useState("")
  const [date, setDate] = useState(new Date())
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault()  
      setIsLoading(true)
      await onSubmit({ title, date: new Date(date), location, description })
      setIsLoading(false)
      
    } catch (error) {
      alert(error ?? "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 font-caveat">
      <div>
        <Label htmlFor="title">Event Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          type="date"
          value={date.toISOString().split('T')[0]}
          onChange={(e) => setDate(new Date(e.target.value))}
          required
        />
      </div>
      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full font-caveat" disabled={isLoading}>
        {isLoading ? "Adding Event..." : "Add Event"}
      </Button>
    </form>
  )
}

