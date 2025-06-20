'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

export function LiquidSphere() {
  const sphereRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = state.clock.elapsedTime * 0.2
      sphereRef.current.rotation.y = state.clock.elapsedTime * 0.3
      sphereRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
  })
  
  return (
    <Sphere ref={sphereRef} args={[1, 64, 64]} position={[0, 0, 0]}>
      <MeshDistortMaterial
        color="#06b6d4"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.1}
        metalness={0.8}
        emissive="#1e40af"
        emissiveIntensity={0.2}
        transparent
        opacity={0.8}
      />
    </Sphere>
  )
}
