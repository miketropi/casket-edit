import * as THREE from "three";
import { useGLTF, Decal, useTexture } from '@react-three/drei';
import { useRef, useState, useEffect } from "react";
import { useAppStore } from '../context/AppContext';

function Model(atts) {
  const { addPlane } = useAppStore();
  const { scene, nodes } = useGLTF('https://pub-0645c3b9d3674132af6b362484df0f3c.r2.dev/Casket_Model.glb'); 
  const decalTexture = useTexture("/decal.jpg");
  const meshRefs = useRef({});
  const [decals, setDecals] = useState([]);
  
  useEffect(() => {
    const decalElements = [];

    scene.traverse((child) => {
      if (child.isMesh) {
        meshRefs.current[child.name] = child; 
        child.userData.originalColor = child.material.color.getHex();

        const box = new THREE.Box3().setFromObject(child);
        const center = box.getCenter(new THREE.Vector3());

        decalElements.push(
          <mesh { ...child }>
            <Decal
              debug={ 1 }
              key={child.uuid}
              position={[center.x, center.y, center.z]}
              rotation={[0, 0, 0]}
              scale={child.scale.x} 
              map={decalTexture}
            />
          </mesh>
        );
      }
    });

    setDecals(decalElements);
  }, [scene, decalTexture]);

  const handleHover = (e, isHover = true) => {
    e.stopPropagation();
    // const mesh = e.object;
    // mesh.material.color.set(isHover ? "red" : mesh.userData.originalColor); 
  };

  const handleClick = (e) => {
    e.stopPropagation();
    const mesh = e.object;
    const { name, uuid } = mesh;
    addPlane({ name, uuid })
    // console.log(mesh)
  };

  return (
    <group { ...atts }>
      <primitive 
        object={ scene } 
        onPointerOver={handleHover} 
        onPointerOut={(e) => handleHover(e, false)} 
        onClick={handleClick} 
      />
      {/* { decals } */}
    </group>
  );
}

export default Model; 