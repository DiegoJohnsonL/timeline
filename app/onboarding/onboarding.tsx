"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { saveTimeline } from "../actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingAnimation from "./loading-animation";
import { Session } from "next-auth";
// import HeartsAnimation from "./hearts-animation";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const steps = [
  {
    fields: [""],
  },
  {
    fields: ["timelineTitle", "timelineDescription"],
  },
  {
    fields: ["events.0.title", "events.0.date", "events.0.location"],
  },
  {
    fields: [""],
  },
];

const onboardingSchema = z.object({
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

type OnboardingSchema = z.infer<typeof onboardingSchema>;

export default function OnboardingComponent({ session }: { session: Session }) {
  const [step, setStep] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const form = useForm<OnboardingSchema>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      userId: session.user!.id,
      timelineTitle: "",
      timelineDescription: "",
        events: [
          {
            title: "",
            date: new Date(),
            description: "",
          },
        ],
    },
  });

  const nextStep = async () => {
    if (step > 0) {
        const fields = steps[step].fields as (keyof OnboardingSchema)[];
        const valid = await form.trigger(fields);
        if (!valid) {
            return;
        }
    }
    setStep((prevStep) => prevStep + 1);
  };

  const onSubmit = async (data: OnboardingSchema) => {
    console.log(data);
    setIsLoading(true);
    try {
      const res = await saveTimeline(data);
      console.log(res);
      router.push("/home");
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const handleAnimationComplete = () => {
    setStep(0);
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <div className="min-h-screen relative mx-auto flex items-center justify-center bg-background">
        {step >= 0 && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2  z-0 opacity-50">{/* <HeartsAnimation /> */}</div>
        )}
        <div className="w-full z-10">
          <AnimatePresence mode="wait">
            {step === -1 && <LoadingStep onComplete={handleAnimationComplete} />}
            {step === 0 && <WelcomeStep nextStep={nextStep} />}
            {step === 1 && <TimelineCreationStep form={form} nextStep={nextStep} />}
            {step === 2 && <FirstEventStep form={form} nextStep={nextStep} />}
            {step === 3 && <CompletionStep onSubmit={form.handleSubmit(onSubmit)} isLoading={isLoading} />}
          </AnimatePresence>

          {step >= 0 && (
            <div className="mt-8 flex justify-center space-x-2">
              {[0, 1, 2, 3].map((_, index) => (
                <div key={index} className={`w-2 h-2 rounded-full ${index === step ? "bg-primary" : "bg-white"}`} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Form>
  );
}

function LoadingStep({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-fit mx-auto">
      <LoadingAnimation onComplete={onComplete} />
    </motion.div>
  );
}

function WelcomeStep({ nextStep }: { nextStep: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center"
    >
      <h1 className="text-4xl font-bold text-foreground mb-4">Happy One Year Anniversary Meu Amor ❤️</h1>
      <p className="text-xl text-foreground/80 mb-4 font-caveat">
        Last year with you has been the best year of my life. It has been filled with so many amazing memories, crazy adventures, hard decisions, lots of laughs, LOTS of food and a lot of love. That is why i want to create a place where we can store all our memories together, a place to come back, remember and talk about everything we have done together. 
      </p>
     
        <Button
          onClick={nextStep}
          className="bg-primary font-caveat text-base text-primary-foreground px-6 py-2 rounded-full hover:bg-primary/90 transition-all duration-300"
        >
          Start Our Journey
        </Button>
    </motion.div>
  );
}

function TimelineCreationStep({ form, nextStep }: { form: any, nextStep: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center space-y-4"
    >
      <div className="">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Create Your Timeline</h2>
        <p className="text-foreground/80">
          A timeline is a collection of our special moments together. Give it a meaningful title and description 
          that captures the essence of our journey.
        </p>
      </div>
      <div className="space-y-6">
        <FormField
          control={form.control}
          name="timelineTitle"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel className="text-xl font-semibold">Timeline Title</FormLabel>
              <FormControl>
                <Input className="max-w-[80%] mx-auto" placeholder="Our Journey" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="timelineDescription"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel className="text-xl font-semibold">Timeline Description</FormLabel>
              <FormControl>
                <Input className="max-w-[80%] mx-auto" placeholder="A collection of our special moments" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
     
        <Button
          onClick={nextStep}
          className="bg-primary font-caveat text-base text-primary-foreground px-6 py-2 rounded-full hover:bg-primary/90 transition-all duration-300"
        >
          Next
        </Button>
    </motion.div>
  );
}

function FirstEventStep({ form, nextStep }: { form: any, nextStep: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center space-y-4"
    >
      <div className="mb-8 space-y-2">
        <h2 className="text-2xl font-semibold text-foreground ">Add Your First Memory</h2>
        <p className="text-foreground/80">
          Let&apos;s start with your first special moment together. It could be your first date, 
          when you met, or any other meaningful beginning to your story.
        </p>
      </div>
      <FormField
        control={form.control}
        name="events.0.title"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xl font-semibold">First Event Title</FormLabel>
            <FormControl>
              <Input placeholder="First Date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="events.0.date"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xl font-semibold">First Event Date</FormLabel>
            <FormControl>
              <Input
                type="date"
                {...field}
                value={field.value instanceof Date ? field.value.toISOString().split("T")[0] : ""}
                onChange={(e) => field.onChange(new Date(e.target.value))}
                className="[&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-2 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="events.0.description"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xl font-semibold">First Event Description</FormLabel>
            <FormControl>
              <Input placeholder="Description" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
     
        <Button
          onClick={nextStep}
          className="bg-primary text-primary-foreground font-caveat text-base px-6 py-2 rounded-full hover:bg-primary/90 transition-all duration-300"
        >
          Next
        </Button>
    </motion.div>
  );
}

function CompletionStep({  onSubmit, isLoading }: {  onSubmit: () => void, isLoading: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center space-y-4"
    >
      <h2 className="text-2xl font-semibold text-foreground ">Antes de começarmos, tenho algo para te dizer.</h2>
      <p className=" text-foreground/80 ">
        Meu amor, cada momento ao seu lado é um presente precioso que guardo no coração. Você trouxe luz e alegria para 
        minha vida de uma forma que nunca imaginei ser possível. Seu sorriso ilumina meus dias, sua força me inspira, 
        e seu amor me faz querer ser uma pessoa melhor a cada dia. Não consigo imaginar minha vida sem você, sem 
        nossas risadas, nossos momentos juntos, até mesmo quando você me tira do sério e me dá vontade de te matar, mas não consigo porque você é fofa demais. Você é meu amor, minha melhor amiga, minha companheira de vida. Te amo mais do que palavras podem expressar, 
        hoje e sempre. Obrigado por fazer parte da minha história e por me permitir fazer parte da sua.
      </p>
      
        <Button
          onClick={onSubmit}
          disabled={isLoading}
          className="bg-primary text-primary-foreground font-caveat text-base px-6 py-2 rounded-full hover:bg-primary/90 transition-all duration-300 disabled:opacity-50"
        >
          {isLoading ? "Loading..." : "Continue"}
        </Button>
    </motion.div>
  );
}
