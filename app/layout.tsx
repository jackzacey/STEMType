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
      <body style={{ backgroundColor: '#0f172a', color: '#e2e8f0' }} className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  )
}
