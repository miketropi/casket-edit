import * as THREE from "three";
import { Decal, useTexture } from "@react-three/drei";
import { useMemo } from "react";

export default function DecalPlane({ decalAtts, decalImage }) {
  const decalTexture = useTexture(decalImage);

  const imageRatio = decalTexture.image.width / decalTexture.image.height;
  const baseSize = decalAtts?.scale;
  const scale = [baseSize * imageRatio, baseSize, baseSize];

  return (
    <Decal 
      { ...decalAtts }
      scale={ scale }
      receiveShadow
      castShadow
    >
      <meshStandardMaterial
        map={decalTexture}
        metalness={0.2}
        roughness={0.7}
        transparent={true}
        depthTest={true}
        depthWrite={true}
        polygonOffset={true}
        polygonOffsetFactor={-4}
        toneMapped={true}
      />
    </Decal>
  )
}