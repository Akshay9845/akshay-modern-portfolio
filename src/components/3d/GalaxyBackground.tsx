'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function GalaxyPoints() {
  const ref = useRef<THREE.Points>(null!)
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(3000 * 3)
    const colors = new Float32Array(3000 * 3)
    
    for (let i = 0; i < 3000; i++) {
      const radius = Math.random() * 20 + 5
      const spinAngle = radius * 0.3
      const branchAngle = (i % 3) * (Math.PI * 2 / 3)
      
      const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3
      const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3
      const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3
      
      positions[i * 3] = Math.cos(branchAngle + spinAngle) * radius + randomX
      positions[i * 3 + 1] = randomY
      positions[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ
      
      // Color based on distance from center
      const colorIntensity = Math.min(1, Math.max(0, 1 - radius / 20))
      colors[i * 3] = 0.1 + colorIntensity * 0.9 // R
      colors[i * 3 + 1] = 0.3 + colorIntensity * 0.7 // G
      colors[i * 3 + 2] = 0.8 + colorIntensity * 0.2 // B
    }
    
    return { positions, colors }
  }, [])
  
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.05
      ref.current.rotation.x += delta * 0.02
    }
  })
  
  return (
    <Points ref={ref} positions={particlesPosition.positions} colors={particlesPosition.colors}>
      <PointMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

export function GalaxyBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <GalaxyPoints />
        <ambientLight intensity={0.1} />
      </Canvas>
    </div>
  )
}
