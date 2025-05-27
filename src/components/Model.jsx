import * as THREE from "three";
import { useGLTF } from '@react-three/drei';
import { useRef, useState, useEffect, useMemo } from "react";
import { useAppStore } from '../context/AppContext';
import DecalPlane from './DecalPlane';

function Model(atts) {
  const { addPlane, planes, setPlanes, rotationSetupInit, setMainLoaded } = useAppStore();
  
  const gltf = useGLTF(import.meta.env.VITE_CASKET_MODEL_PATH); 
  const { scene } = gltf;

  // Create glass material once to reuse
  const glassMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0xffffff),
    metalness: 1,
    roughness: 0, // Slight roughness for realistic glass
    transparent: true,
    flatShading: false, // Use smooth shading for better light blending
    opacity: 0.4, // Fully opaque when using transmission
    // transmission: 1, // Enables real transparency (like glass)
    ior: 1.45, // Index of refraction (glass is ~1.45)
    thickness: 0.5, // Depth for refraction calculation
    clearcoat: 1,
    clearcoatRoughness: 0,
    side: THREE.DoubleSide,
    depthWrite: false, // Prevents depth blocking
    blending: THREE.NormalBlending,
    envMapIntensity: 1, // Ensure environment reflections are visible
  }), []);

  useEffect(() => {
    setMainLoaded(true);
  }, [gltf]);

  const meshRefs = useRef({});
  const [decals, setDecals] = useState([]);

  useEffect(() => {
    const decalElements = [];

    scene.traverse((child) => {
      if (child.isMesh) {
        meshRefs.current[child.name] = child;

        if (child.name.startsWith("Coffin_Handle_Rev") || child.name.startsWith("Cone")) {
          child.material = glassMaterial;
          child.renderOrder = 2; // Ensure handles render after other objects
        }

        let plane = planes.find(p => p.name === child.name);
        if (plane) {
          decalElements.push(
            <mesh 
              key={child.uuid} 
              {...child} 
              renderOrder={0} // Ensure base objects render first
            >
              {plane.decalImage && (
                <DecalPlane 
                  decalAtts={{ ...plane }}
                  decalImage={plane.decalImage}
                />
              )}
              <meshPhongMaterial 
                color={'#ffffff'} 
                castShadow
                receiveShadow
                shadowSide={THREE.FrontSide}
                shadowBias={-0.0001}
              />
            </mesh>
          );
        }
      }
    });

    setDecals(decalElements);
  }, [scene, planes, glassMaterial]);

  return (
    <group {...atts}>
      <primitive 
        object={scene} 
        castShadow
        receiveShadow
      />
      {decals}
    </group>
  );
}

export default Model;