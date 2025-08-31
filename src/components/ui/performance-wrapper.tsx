'use client'

import { useState, useEffect } from 'react'
import { isLowPerformanceDevice, shouldDisableHeavyEffects } from '@/lib/utils'

interface PerformanceWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function PerformanceWrapper({ children, fallback }: PerformanceWrapperProps) {
  const [isClient, setIsClient] = useState(false)
  const [isLowPerformance, setIsLowPerformance] = useState(false)
  const [shouldDisableEffects, setShouldDisableEffects] = useState(false)

  useEffect(() => {
    setIsClient(true)
    setIsLowPerformance(isLowPerformanceDevice())
    setShouldDisableEffects(shouldDisableHeavyEffects())
  }, [])

  if (!isClient) {
    return fallback || <div className="min-h-screen bg-black" />
  }

  return (
    <div 
      data-performance={isLowPerformance ? 'low' : 'high'}
      data-effects-disabled={shouldDisableEffects}
    >
      {children}
    </div>
  )
}

export function usePerformanceDetection() {
  const [isClient, setIsClient] = useState(false)
  const [isLowPerformance, setIsLowPerformance] = useState(false)
  const [shouldDisableEffects, setShouldDisableEffects] = useState(false)

  useEffect(() => {
    setIsClient(true)
    setIsLowPerformance(isLowPerformanceDevice())
    setShouldDisableEffects(shouldDisableHeavyEffects())
  }, [])

  return {
    isClient,
    isLowPerformance,
    shouldDisableEffects
  }
}
