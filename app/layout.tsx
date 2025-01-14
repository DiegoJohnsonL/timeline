import { Playfair_Display, Lora, Caveat } from 'next/font/google'
import './globals.css'
import { SessionProvider } from 'next-auth/react'
import MusicPlayer from '@/components/music'

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
const lora = Lora({ subsets: ['latin'], variable: '--font-lora' })
const caveat = Caveat({ subsets: ['latin'], variable: '--font-caveat' })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${caveat.variable} ${lora.variable}` }>
        <SessionProvider>
        <MusicPlayer />
          <main className="min-h-screen">{children}</main>
        </SessionProvider>
      </body>
    </html>
  )
}

