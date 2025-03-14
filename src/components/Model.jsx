import * as THREE from "three";
import { useGLTF, Decal, useTexture } from '@react-three/drei';
import { useRef, useState, useEffect, Suspense } from "react";
import { useAppStore } from '../context/AppContext';
import DecalPlane from './DecalPlane';

function Model(atts) {
  const { addPlane, planes, setPlanes, rotationSetupInit, setMainLoaded } = useAppStore();
  // const [__material, set__material] = useState(null);
  // console.log(import.meta.env.VITE_CASKET_MODEL_PATH)
  
  const gltf = useGLTF( import.meta.env.VITE_CASKET_MODEL_PATH ); 
  // console.log(gltf); 
  const { scene, nodes } = gltf;

  useEffect(() => {
    // console.log('Model loaded:', gltf);
    setMainLoaded(true);
  }, [gltf]);

  // const decalTexture = useTexture("/decal.jpg");
  const meshRefs = useRef({});
  const [decals, setDecals] = useState([]);


  useEffect(() => {
    const decalElements = [];
    const __Mesh = scene.getObjectByName("Coffin_Handle_RevT1003");

    scene.traverse((child) => {
      if (child.isMesh) {
        meshRefs.current[child.name] = child; 
        // child.userData.originalColor = child.material.color.getHex();

        
        if(['Coffin_Handle_RevT1002', 'Coffin_Handle_RevT1', 'Sphere001'].includes(child.name)) {
          // console.log(child.name)
          child.material = __Mesh.material;
        }

        let plane = planes.find(p => p.name == child.name);
        if(plane) {

          decalElements.push(
            <mesh 
              key={ child.uuid } 
              { ...child } >
              {
                plane.decalImage && <DecalPlane 
                  decalAtts={ { ...plane } }
                  decalImage={ plane.decalImage }
                />
              }

              {/* <meshPhongMaterial color={ (plane?.color ? plane.color : '#ffffff') } /> */}
              <meshPhongMaterial color={ '#ffffff' } />
            </mesh>
          )
        }
      }
    });

    setDecals(decalElements);
  }, [scene, planes]);

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

    // console.log(mesh)
    // if(!__material) {
    //   set__material(mesh.material);
    // } else {
    //   mesh.material = __material;
    // }

    // let type = prompt('Please enter type of mesh...!');
    // if(!type) return;

    // addPlane({ 
    //   name, 
    //   position,
    //   rotation: rotationSetupInit[`__${type}`],
    //   scale,
    //   decalImage: '/decal.jpg' })
  };

  return (
    <group { ...atts }>
      <primitive 
        object={ scene } 
        // onPointerOver={handleHover} 
        // onPointerOut={(e) => handleHover(e, false)} 
        // onClick={handleClick} 
      />
      { decals }
    </group>
  );
}

export default Model; 