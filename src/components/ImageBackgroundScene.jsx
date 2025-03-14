import { useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { useTexture } from "@react-three/drei"
import * as THREE from "three"

export default function ImageBackgroundScene() {
  const url = '/lifestyle_800x290.png';
  const texture = useTexture(url);
  const { camera } = useThree()
  const meshRef = useRef()

  useFrame(() => {
    if (!meshRef.current) return

    const distance = 10 
    const fov = camera.fov * (Math.PI / 180)
    const height = 2 * Math.tan(fov / 2) * distance
    const width = height * (texture.image.width / texture.image.height)

    meshRef.current.position.copy(camera.position)
    meshRef.current.quaternion.copy(camera.quaternion)
    meshRef.current.translateZ(-distance) 
    meshRef.current.scale.set(width / 3.2, height / 3.2, 1)
  })
  
  return <>
    <mesh ref={meshRef} renderOrder={-1} >
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial 
        transparent={true} 
        opacity={.4} 
        depthWrite={false} 
        map={texture} />
    </mesh>
  </>
}