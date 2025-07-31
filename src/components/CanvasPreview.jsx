import { useRef, useEffect } from 'react';
import { Canvas as ThreeCanvas } from '@react-three/fiber';
import { OrbitControls, Center, Environment } from '@react-three/drei'; 
import { Suspense } from "react";
import Model from '../components/Model';
import { useAppStore } from '../context/AppContext';
import ImageBackgroundScene from './ImageBackgroundScene';
import { CameraHelper } from 'three';

function ShadowCameraHelper({ light }) {
  const helper = useRef();
  
  useEffect(() => {
    if (helper.current) {
      helper.current.update();
    }
  }, [light]);

  return (
    <primitive 
      object={new CameraHelper(light.shadow.camera)}
      ref={helper}
    />
  );
}

export default function CanvasPreview({
  ambientIntensity = 0.2,
  mainIntensity = 0.2,
  secondaryIntensity = 0,
  bottomIntensity = 0.2,
  bottomColor = '#ffeedd',
  envPreset = 'studio',
  envIntensity = 0.1
}) {
  const OrbitControls_Ref = useRef();
  const { mainLoaded, developMode } = useAppStore();
  const mainLightRef = useRef();
  const secondaryLightRef = useRef();
  useEffect(() => {
    if( !mainLoaded ) return;
    
    let [azimuth, polar] = [0.8221754888404541, 1.1626254961722569];
    OrbitControls_Ref.current.setAzimuthalAngle(azimuth);
    OrbitControls_Ref.current.setPolarAngle(polar);
  }, [mainLoaded]);

  return (
    <ThreeCanvas shadows>
      <color attach="background" args={['#f0f0f0']} />
      <ambientLight intensity={ambientIntensity} />
      <directionalLight 
        ref={mainLightRef}
        position={[5, 5, 5]} 
        intensity={mainIntensity}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.0001}
      />
      <directionalLight 
        ref={secondaryLightRef}
        position={[5, 0, 0]}
        intensity={secondaryIntensity}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <directionalLight
        position={[0, -2, 5]}
        intensity={bottomIntensity}
        color={bottomColor}
        castShadow={false}
      />
      <Environment preset={envPreset} intensity={envIntensity} />

      {/* Shadow Camera Helpers - Only show in development mode */}
      {developMode && mainLightRef.current && <ShadowCameraHelper light={mainLightRef.current} />}
      {developMode && secondaryLightRef.current && <ShadowCameraHelper light={secondaryLightRef.current} />}

      <ImageBackgroundScene />

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
      />
    </ThreeCanvas>
  )
}