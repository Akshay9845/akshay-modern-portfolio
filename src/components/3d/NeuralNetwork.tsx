'use client'

import { useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

export function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null!)
  
  const nodes = useMemo(() => {
    const nodes = []
    for (let i = 0; i < 50; i++) {
      nodes.push({
        position: [
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        ] as [number, number, number],
        id: i
      })
    }
    return nodes
  }, [])

  const connections = useMemo(() => {
    const connections = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (Math.random() > 0.8) {
          connections.push({
            start: nodes[i].position,
            end: nodes[j].position
          })
        }
      }
    }
    return connections
  }, [nodes])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Render nodes */}
      {nodes.map((node, index) => (
        <mesh key={index} position={node.position}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial 
            color="#00ffff" 
            emissive="#004466"
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
      
      {/* Render connections */}
      {connections.map((connection, index) => {
        const start = new THREE.Vector3(...connection.start)
        const end = new THREE.Vector3(...connection.end)
        const distance = start.distanceTo(end)
        const midpoint = start.clone().add(end).multiplyScalar(0.5)
        
        // Calculate rotation to align cylinder with connection
        const direction = end.clone().sub(start).normalize()
        const angle = Math.atan2(direction.x, direction.y)
        
        return (
          <mesh 
            key={`connection-${index}`} 
            position={midpoint.toArray()}
            rotation={[0, 0, angle]}
          >
            <cylinderGeometry args={[0.005, 0.005, distance, 8]} />
            <meshStandardMaterial 
              color="#66aaff" 
              transparent 
              opacity={0.3}
            />
          </mesh>
        )
      })}
    </group>
  )
}
