import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center } from '@react-three/drei'; 
import { Suspense } from "react";
import Model from '../components/Model';

export default function CanvasPreview() {
  return (
    <Canvas>
      <color attach="background" args={['#f0f0f0']} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} />
      <Suspense fallback={false}>
        <Center>
          <Model position={[0, 0, 0]} scale={2} />
        </Center>
      </Suspense>
      <OrbitControls 
        makeDefault 
        enableZoom={true} 
        enablePan={false}
      />
    </Canvas>
  )
}