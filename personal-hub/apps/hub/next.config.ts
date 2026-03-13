import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: [
    '@hub/ui',
    '@hub/lib',
    '@hub/supabase',
    '@hub/finances',
    '@hub/tasks',
    '@hub/notes',
    '@hub/news',
    '@hub/reading',
    '@hub/professional',
  ],
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
