import { useRef, useEffect } from 'react';
import { Canvas as ThreeCanvas } from '@react-three/fiber';
import { OrbitControls, Center } from '@react-three/drei'; 
import { Suspense } from "react";
import Model from '../components/Model';
import { useAppStore } from '../context/AppContext';

export default function CanvasPreview() {
  const OrbitControls_Ref = useRef();
  const { mainLoaded } = useAppStore();

  useEffect(() => {
    if( !mainLoaded ) return;
    
    let [azimuth, polar] = [0.8221754888404541, 1.1626254961722569];
    OrbitControls_Ref.current.setAzimuthalAngle(azimuth);
    OrbitControls_Ref.current.setPolarAngle(polar);
  }, [mainLoaded]);

  // const onChangeOrb = (e) => {
  //   console.log([
  //     OrbitControls_Ref.current.getAzimuthalAngle(), 
  //     OrbitControls_Ref.current.getPolarAngle()]);
  // }

  return (
    <ThreeCanvas>
      <color attach="background" args={['#f0f0f0']} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} />
      <Suspense fallback={false}>
        <Center>
          <Model position={[0, 0, 0]} scale={2.6} />
        </Center>
      </Suspense>
      <OrbitControls 
        ref={OrbitControls_Ref}
        makeDefault 
        enableZoom={true} 
        enablePan={false}
        minPolarAngle={0} maxPolarAngle={Math.PI / 2}
        // onChange={ onChangeOrb }
      />
    </ThreeCanvas>
  )
}