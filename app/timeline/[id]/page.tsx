import { db } from "@/data/db";
import { timelines } from "@/data/schema";
import { eq } from "drizzle-orm";
import Content from "./content";
import { auth } from "@/lib/auth";

export default async function Page({ params }: { params: { id: string } }) {
  const session = await auth();
  console.log(session);
  const timeline = await db.query.timelines.findFirst({
    where: eq(timelines.id, params.id),
    with: {
      events: true,
    },
  });
  console.log(timeline);
  return <Content timeline={timeline} />
}