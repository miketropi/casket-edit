import { Decal, useTexture } from "@react-three/drei";

export default function DecalPlane({ decalAtts, decalImage }) {
  const decalTexture = useTexture(decalImage);
  console.log(decalTexture);
  
  return (
    <Decal 
      { ...decalAtts }
      debug={ 1 }
    >
      <meshBasicMaterial
        map={ decalTexture }
        polygonOffset
        polygonOffsetFactor={-1} // The material should take precedence over the original
      />
    </Decal>
  )
}