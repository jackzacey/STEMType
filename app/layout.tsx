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
    <html lang="en" style={{ backgroundColor: '#0f172a' }}>
      <body
        style={{
          backgroundColor: '#0f172a',
          color: '#e2e8f0',
          minHeight: '100vh',
        }}
        className="!bg-[#0f172a] !text-[#e2e8f0]"
      >
        {children}
      </body>
    </html>
  )
}
