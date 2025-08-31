import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Performance optimization utilities - Client-side only
export function isHighRefreshRate(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return window.matchMedia('(min-resolution: 120dpi)').matches || 
           window.matchMedia('(min-resolution: 2dppx)').matches
  } catch {
    return false
  }
}

export function shouldReduceMotion(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch {
    return false
  }
}

export function getOptimalParticleCount(): number {
  if (typeof window === 'undefined') return 20
  try {
    const isHighEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency > 4
    const isHighRefresh = isHighRefreshRate()
    return isHighEnd && isHighRefresh ? 50 : 20
  } catch {
    return 20
  }
}

export function getOptimalAnimationDuration(): number {
  if (typeof window === 'undefined') return 0.5
  try {
    const isHighRefresh = isHighRefreshRate()
    return isHighRefresh ? 0.3 : 0.5
  } catch {
    return 0.5
  }
}

// Device performance detection - Client-side only
export function isLowPerformanceDevice(): boolean {
  if (typeof window === 'undefined') return false

  try {
    // Check for low-end devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    const hasLowMemory = (navigator as any).deviceMemory && (navigator as any).deviceMemory < 4
    const hasLowCores = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4

    return isMobile || hasLowMemory || hasLowCores
  } catch {
    return false
  }
}

// Scroll performance optimization - Client-side only
export function shouldDisableHeavyEffects(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return isLowPerformanceDevice() || shouldReduceMotion()
  } catch {
    return false
  }
}

// Animation frame rate detection - Client-side only
export function getOptimalFrameRate(): number {
  if (typeof window === 'undefined') return 60
  try {
    const isHighRefresh = isHighRefreshRate()
    return isHighRefresh ? 120 : 60
  } catch {
    return 60
  }
}

// Safe client-side detection
export function useClientSide(): boolean {
  return typeof window !== 'undefined'
}
