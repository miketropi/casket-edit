import * as THREE from "three";
import { useGLTF, Decal, useTexture } from '@react-three/drei';
import { useRef, useState, useEffect, Suspense } from "react";
import { useAppStore } from '../context/AppContext';
import DecalPlane from './DecalPlane';

function Model(atts) {
  const { addPlane, planes, setPlanes, rotationSetupInit } = useAppStore();
  const { scene, nodes } = useGLTF( import.meta.env.VITE_CASKET_MODEL_PATH ); 
  const decalTexture = useTexture("/decal.jpg");
  const meshRefs = useRef({});
  const [decals, setDecals] = useState([]);


  useEffect(() => {
    const decalElements = [];

    scene.traverse((child) => {
      if (child.isMesh) {
        meshRefs.current[child.name] = child; 
        // child.userData.originalColor = child.material.color.getHex();

        let plane = planes.find(p => p.name == child.name);
        if(plane) {

          decalElements.push(
            <mesh 
              key={ child.uuid } 
              { ...child } >
              <DecalPlane 
                decalAtts={ { ...plane } }
                decalImage={ plane.decalImage }
              />
            </mesh>
          )
        }
      }
    });

    setDecals(decalElements);
  }, [scene, decalTexture, planes]);

  const handleHover = (e, isHover = true) => {
    e.stopPropagation();
    // const mesh = e.object;
    // mesh.material.color.set(isHover ? "red" : mesh.userData.originalColor); 
  };

  const handleClick = (e) => {
    e.stopPropagation();
    
    const mesh = e.object; 
    const { name, uuid } = mesh;
    const position = Object.values(mesh.geometry.boundingSphere.center);
    const scale = mesh.scale.x;

    let type = prompt('Please enter type of mesh...!');
    if(!type) return;

    addPlane({ 
      name, 
      position,
      rotation: rotationSetupInit[`__${type}`],
      scale,
      decalImage: '/decal.jpg' })
  };

  return (
    <group { ...atts }>
      <primitive 
        object={ scene } 
        onPointerOver={handleHover} 
        onPointerOut={(e) => handleHover(e, false)} 
        onClick={handleClick} 
      />
      { decals }
    </group>
  );
}

export default Model; 