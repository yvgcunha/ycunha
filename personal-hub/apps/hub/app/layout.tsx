import type { Metadata } from 'next'
import './globals.css'
import { SidebarShell } from '../components/sidebar-shell'

export const metadata: Metadata = {
  title: 'Personal HUB',
  description: 'Your personal hub for productivity and life management',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="font-sans antialiased">
        <div className="flex min-h-screen items-stretch bg-[#f8f9fa] text-foreground md:h-screen md:overflow-hidden">
          <SidebarShell />
          <main className="relative min-h-screen flex-1 overflow-y-auto md:min-h-0">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(73,162,150,0.12),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(15,23,42,0.06),_transparent_24%)]" />
            <div className="relative mx-auto max-w-[1600px] p-5 sm:p-8 lg:p-10">{children}</div>
          </main>
        </div>
      </body>
    </html>
  )
}
