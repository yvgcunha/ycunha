import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Sidebar } from '../components/sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Personal HUB',
  description: 'Your personal hub for productivity and life management',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="flex h-screen overflow-hidden bg-gray-50/50">
          <Sidebar />
          <main className="flex-1 overflow-y-auto relative">
            <div className="max-w-[1600px] mx-auto p-8">{children}</div>
          </main>
        </div>
      </body>
    </html>
  )
}
