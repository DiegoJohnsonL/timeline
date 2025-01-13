import { Playfair_Display, Lora } from 'next/font/google'
import './globals.css'
import { SessionProvider } from 'next-auth/react'

const playfair = Playfair_Display({ subsets: ['latin'] })
const lora = Lora({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${playfair.className} ${lora.className}`}>
        <SessionProvider>
          <main className="min-h-screen">{children}</main>
        </SessionProvider>
      </body>
    </html>
  )
}

