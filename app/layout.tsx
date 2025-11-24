import './globals.css'

export const metadata = {
  title: 'STEMType',
 description: 'Master Biology & Chemistry by typing',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-bg text-text min-h-screen antialiased">
        {children}
      </body>
    </html>
  )
}
