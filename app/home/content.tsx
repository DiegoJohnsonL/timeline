"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Search } from 'lucide-react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { NewTimelineForm } from "@/components/new-timeline-form"


export default function Content({ userTimelines }: { userTimelines: any }) {
  const [timelines, setTimelines] = useState(userTimelines)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTimelines = timelines.filter((timeline: any) =>
    timeline.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <main className="container mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-5xl  text-primary mb-8 text-center"
      >
        MemoryTrail
      </motion.h1>
      <div className="flex gap-4 justify-between items-center mb-6">
        <div className="relative w-full">
          <Input
            type="text"
            placeholder="Search timelines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
        <Dialog >
          <DialogTrigger asChild>
            <Button >
              <Plus  /> Add Timeline
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Timeline</DialogTitle>
              <DialogDescription>
                Start a new journey by creating a timeline for your memories.
              </DialogDescription>
            </DialogHeader>
            <NewTimelineForm onSubmit={(data) => {
              setTimelines([...timelines, { id: String(timelines.length + 1), ...data }])
            }} />
          </DialogContent>
        </Dialog>
      </div>
      {filteredTimelines.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-16"
        >
          <img src="/empty-state.svg" alt="No timelines" className="mx-auto mb-4 w-48" />
          <p className="text-xl text-gray-600">No timelines yet! Start creating your journey!</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredTimelines.map((timeline: any) => (
            <motion.div
              key={timeline.id}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="overflow-hidden border-2 border-primary shadow-md">
                <CardHeader className="p-0">
                  <img
                    src={"/placeholder.svg"}
                    alt={timeline.title}
                    className="w-full h-48 object-cover"
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className=" text-2xl mb-2">{timeline.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mb-2">{timeline.description}</p>
                  <p className="text-sm text-muted-foreground font-caveat">
                    {new Date(timeline.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href={`/timeline/${timeline.id}`} passHref>
                    <Button variant="default" className="w-full font-caveat">View Timeline</Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </main>
  )
}

