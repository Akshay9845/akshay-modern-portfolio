'use client'

import { useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { Text } from '@react-three/drei'

export function HologramEffect() {
  const groupRef = useRef<THREE.Group>(null!)
  const materialRef = useRef<THREE.ShaderMaterial>(null!)
  
  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `
  
  const fragmentShader = `
    uniform float time;
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vec3 color1 = vec3(0.0, 1.0, 1.0); // Cyan
      vec3 color2 = vec3(0.0, 0.5, 1.0); // Blue
      
      float noise = sin(vPosition.y * 10.0 + time * 2.0) * 0.1;
      float gradient = vUv.y + noise;
      
      vec3 finalColor = mix(color1, color2, gradient);
      
      // Add scanlines effect
      float scanlines = sin(vUv.y * 800.0) * 0.04;
      finalColor += scanlines;
      
      // Add transparency based on position
      float alpha = 0.7 + sin(time + vPosition.y * 5.0) * 0.3;
      
      gl_FragColor = vec4(finalColor, alpha);
    }
  `

  const uniforms = useMemo(() => ({
    time: { value: 0 }
  }), [])

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Holographic plane */}
      <mesh position={[0, 0, -1]}>
        <planeGeometry args={[3, 4, 32, 32]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Floating text */}
      <Text
        position={[0, 1, 0]}
        fontSize={0.3}
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/roboto-mono.woff"
      >
        AI ENGINEER
      </Text>
      
      <Text
        position={[0, 0.5, 0]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        NEXT.JS • THREE.JS • AI
      </Text>
      
      {/* Orbiting elements */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 6) * Math.PI * 2) * 2,
            Math.sin((i / 6) * Math.PI * 2) * 0.5,
            Math.sin((i / 6) * Math.PI * 2) * 2
          ]}
        >
          <octahedronGeometry args={[0.1]} />
          <meshStandardMaterial 
            color="#00ffff" 
            emissive="#004444"
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  )
}
