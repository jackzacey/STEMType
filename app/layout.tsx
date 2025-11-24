// app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'STEMType',
  description: 'Biology and Chemistry learning app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
