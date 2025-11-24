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
    <html lang="en" className="bg-black">
      <body
        className="min-h-screen bg-black text-slate-100"
        style={{ backgroundColor: '#000000', color: '#e2e8f0' }}
      >
        {children}
      </body>
    </html>
  )
}
