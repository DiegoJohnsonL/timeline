
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function HomePage() {
  const session = await auth()
  if (!session) {
    redirect('/')
  }
  return (
    <div className="container mx-auto py-8">
      <p>This is your timeline app. Your adventures will appear here soon.</p>
      <h1>Welcome {session.user?.name}</h1>
    </div>
  )
}

