"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import type { Group } from "three"

function Shapes() {
  const group = useRef<Group>(null)

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.x += delta * 0.1
      group.current.rotation.y += delta * 0.15
    }
  })

  return (
    <group ref={group} position={[0.5, -0.2, 0]}>
      <mesh position={[0, 0, 0]}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshNormalMaterial wireframe transparent opacity={0.35} />
      </mesh>
      <mesh position={[0.6, 0.4, -0.3]}>
        <icosahedronGeometry args={[0.35, 0]} />
        <meshNormalMaterial wireframe transparent opacity={0.25} />
      </mesh>
      <mesh position={[-0.5, 0.3, 0.3]}>
        <dodecahedronGeometry args={[0.3, 0]} />
        <meshNormalMaterial wireframe transparent opacity={0.3} />
      </mesh>
    </group>
  )
}

export function HeroScene() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 hidden md:block">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }} gl={{ alpha: true }}>
        <Shapes />
      </Canvas>
    </div>
  )
}
