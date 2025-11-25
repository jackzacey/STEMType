// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'STEMTYPE',
  description: 'Type the Universe',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* THIS IS THE ONLY CHANGE — body has NO background */}
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
