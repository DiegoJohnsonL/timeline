import { auth } from "@/lib/auth";
import Content from "./content";
import { redirect } from "next/navigation";
import { db } from "@/data/db";
import { eq } from "drizzle-orm";
import { timelines } from "@/data/schema";

export default async function Page() {
  const session = await auth();
  if (!session?.user) {
    return redirect("/");
  }
  const userTimelines = await db.query.timelines.findMany({
    where: eq(timelines.userId, session.user.id!),
  });
  console.log(userTimelines);
  return (
    <div className="">
      <Content userTimelines={userTimelines} />
    </div>
  );
}
