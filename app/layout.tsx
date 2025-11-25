import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'STEMType',
  description: 'Master Biology & Chemistry by typing',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-transparent text-white">
        {children}
      </body>
    </html>
  )
}
