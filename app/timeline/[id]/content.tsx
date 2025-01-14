"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Edit, Trash2, Plus, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NewEventForm } from "@/components/new-event-form";
import { addEvent } from "@/app/actions";
import { useRouter } from "next/navigation";

export default function Content({ timeline }: { timeline: any }) {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const addEventForm = async (event: any) => {
    try {
      const newEvent = await addEvent(event, timeline.id);
      console.log(newEvent);
      router.refresh();
      setOpen(false);
    } catch (error) {
      alert(error ?? "Something went wrong");
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <nav className="mb-6">
        <Link href="/home" passHref>
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Button>
        </Link>
      </nav>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 bg-card p-6 rounded-lg shadow-md border-2 border-primary"
      >
        <img
          src={"/placeholder.svg"}
          alt={timeline.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h1 className="text-4xl  text-primary mb-2">{timeline.title}</h1>
        <p className="text-muted-foreground font-caveat">{timeline.description}</p>
      </motion.div>
      <div className="flex justify-between items-center mb-6">
        <Button variant="outline" onClick={() => setIsPreviewMode(!isPreviewMode)}>
          {isPreviewMode ? "Exit Preview" : "Preview Timeline"}
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[95vw]">
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
              <DialogDescription>Create a new event for your timeline.</DialogDescription>
            </DialogHeader>
            <NewEventForm onSubmit={addEventForm} />
          </DialogContent>
        </Dialog>
      </div>
      {isPreviewMode ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {timeline.events.map((event: any, index: any) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center"
            >
              <div className="w-1/2 pr-4 ">
                <img
                  src={"/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <div className="w-1/2 pl-4">
                <h3 className="text-2xl  mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-1">
                  {new Date(event.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </p>
                <p className="text-gray-500">{event.location}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {timeline.events.map((event: any) => (
            <motion.div key={event.id} whileHover={{ scale: 1.05 }}>
              <Card className="border-2 border-primary  overflow-hidden shadow-md">
                <CardHeader className="p-0">
                  <img src={"/placeholder.svg"} alt={event.title} className="w-full h-48 object-cover" />
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-2xl mb-2">{event.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mb-1 font-caveat">
                    {new Date(event.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-xs text-muted-foreground font-caveat">{event.location}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="ghost" size="sm" className="font-caveat">
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="font-caveat">
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
      <Button className="mt-8" onClick={() => setIsPreviewMode(!isPreviewMode)}>
        <Map className="mr-2 h-4 w-4" /> Toggle Map View
      </Button>
    </main>
  );
}
