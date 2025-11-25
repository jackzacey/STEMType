// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'

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
      {/* NO BACKGROUND CLASSES AT ALL — THIS IS THE KEY */}
      <body>{children}</body>
    </html>
  )
}
