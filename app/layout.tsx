import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'STEMType',
  description: 'Master Biology & Chemistry by typing definitions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-[#0f172a] text-[#e2e8f0] min-h-screen">{children}</body>
    </html>
  )
}
