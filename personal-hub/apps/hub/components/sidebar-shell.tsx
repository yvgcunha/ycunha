'use client'

import { useState } from 'react'
import { Sidebar } from './sidebar'

export function SidebarShell() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className={`relative h-screen shrink-0 self-stretch bg-[#121212] md:h-full ${collapsed ? 'md:w-24' : 'md:w-72'}`}>
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onToggleCollapse={() => setCollapsed((current) => !current)}
        onToggleMobile={() => setMobileOpen((current) => !current)}
      />
    </div>
  )
}
