import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import './redesign.css'
import './enhancements.css'
import './festival-heroes.css'
import './brand.css'
import './android-note.css'

export const metadata: Metadata = {
  title: 'Aashirvaadam — Essentials for Every Sacred Occasion',
  description: 'Thoughtfully prepared pooja essentials, festive kits, and prasad ingredients for every sacred occasion.',
  generator: 'v0.app',
  icons: {
    icon: '/images/aashirvaadam-logo.png',
    apple: '/images/aashirvaadam-logo.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#FFF8ED',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
