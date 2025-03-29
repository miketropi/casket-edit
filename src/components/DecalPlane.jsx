import * as THREE from "three";
import { Decal, useTexture } from "@react-three/drei";
import { useMemo } from "react";

export default function DecalPlane({ decalAtts, decalImage }) {
  const decalTexture = useTexture(decalImage);

  // decalTexture.center.set(0.5,0.5);
  // decalTexture.flipY = false;
  // decalTexture.wrapS = THREE.RepeatWrapping;
  // decalTexture.wrapT = THREE.RepeatWrapping;

  const imageRatio = decalTexture.image.width / decalTexture.image.height;
  const baseSize = decalAtts?.scale;
  const scale = [baseSize * imageRatio, baseSize, baseSize];
  
  return (
    <Decal 
      { ...decalAtts }
      scale={ scale }
      // debug={ 1 }
    >
      {/* <meshStandardMaterial
        map={decalTexture}
        metalness={1}
        roughness={1}
        // emissive="#ffffff"
        // emissiveIntensity={3}
        // toneMapped={false}
      /> */}
      

      <meshBasicMaterial
        map={ decalTexture }
        polygonOffset
        polygonOffsetFactor={ -2 } // The material should take precedence over the original
        toneMapped={false}
      />
    </Decal>
  )
}