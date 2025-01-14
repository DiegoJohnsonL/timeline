import { z } from "zod";

export const onboardingSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  timelineTitle: z.string().min(1, "Please enter a title "),
  timelineDescription: z.string().min(1, "Please enter a description"),
  events: z.array(
    z.object({
      title: z.string().min(1, "Please enter an event title"),
      date: z.date(),
      description: z.string().min(1, "Please enter an event description"),
    })
  ),
});

export type OnboardingSchema = z.infer<typeof onboardingSchema>

export const eventSchema = z.object({
  title: z.string().min(1, "Please enter an event title"),
  date: z.date(),
  description: z.string().min(1, "Please enter an event description"),
  location: z.string().min(1, "Please enter an event location"),
});

export type EventSchema = z.infer<typeof eventSchema> 

