
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import Onboarding from "./onboarding"

export default async function HomePage() {
  const session = await auth()
  if (!session?.user) {
    redirect('/')
  }
  return (
    <div className="container w-full overflow-hidden">
      <Onboarding session={session} />
    </div>
  )
}

