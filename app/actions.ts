"use server"

import { db } from "@/data/db";
import { events, timelines } from "@/data/schema";
import { EventSchema, eventSchema, OnboardingSchema, onboardingSchema } from "./schemas";


export async function saveTimeline(data: OnboardingSchema) {
  const timeline = onboardingSchema.parse(data);
  const [newTimeline] = await db
    .insert(timelines)
    .values({
      title: timeline.timelineTitle,
      userId: timeline.userId,
      description: timeline.timelineDescription,
    })
    .returning({ id: timelines.id });

  const newEvents = await db.insert(events).values(timeline.events.map((event) => ({
    timelineId: newTimeline.id,
    title: event.title,
    date: event.date,
    description: event.description,
  }))).returning();
  return { timeline: newTimeline, events: newEvents };
}


export async function addEvent(data: EventSchema, timelineId: string) {
  const event = eventSchema.parse(data);
  const [newEvent] = await db.insert(events).values({
    ...event,
    timelineId,
  }).returning({ id: events.id });
  return newEvent;
}
