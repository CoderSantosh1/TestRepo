'use client'

import { injectSpeedInsights } from '@vercel/speed-insights'
import { inject } from '@vercel/analytics'

// Initialize Vercel Analytics and Speed Insights
inject();
injectSpeedInsights({ framework: "nextjs" });

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  )
} 