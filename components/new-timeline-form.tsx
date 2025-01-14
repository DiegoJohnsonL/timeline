"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface NewTimelineFormProps {
  onSubmit: (data: {
    title: string
    description: string
    coverPhoto: string
    startDate: string
  }) => void
}

export function NewTimelineForm({ onSubmit }: NewTimelineFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [coverPhoto, ] = useState("/placeholder.svg")
  const [startDate, setStartDate] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ title, description, coverPhoto, startDate })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 font-caveat">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="startDate">Start Date</Label>
        <Input
          id="startDate"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full font-caveat">Create Timeline</Button>
    </form>
  )
}

