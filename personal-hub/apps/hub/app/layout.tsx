import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Personal HUB',
  description: 'Your personal hub for productivity and life management',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="overflow-hidden">
      <body className="font-sans antialiased overflow-hidden">{children}</body>
    </html>
  )
}
