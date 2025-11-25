import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'STEMTYPE',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="m-0 p-0">{children}</body>
    </html>
  )
}
