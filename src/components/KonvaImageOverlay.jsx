import { useRef, useState, useEffect } from 'react';
import { Image, Layer, Rect } from 'react-konva';
import useImage from 'use-image';

export default function KonvaImageOverlay({ imagePlaceholder, imageOverlay, canvasSize }) {
  const [onLoadInit, setOnLoadInit] = useState(true)
  const [__placeholderImage, __status] = useImage(imagePlaceholder);
  const overlayRef = useRef()
  const maskCanvas = useRef(document.createElement("canvas"))
  const [imagePlaceholderAttributes, setImagePlaceholderAttributes] = useState({
    image: null,
    x: 0,
    y: 0,
    width: 0,
    height: 0
  })

  useEffect(() => {
    const img = new window.Image()
    img.src = imagePlaceholder
    img.onload = () => {
      const scale = Math.min(
        canvasSize.width / img.naturalWidth,
        canvasSize.height / img.naturalHeight
      );

      // Calculate scaled dimensions
      const scaledWidth = img.naturalWidth * scale;
      const scaledHeight = img.naturalHeight * scale;

      // Calculate centered position
      const x = (canvasSize.width - scaledWidth) / 2;
      const y = (canvasSize.height - scaledHeight) / 2;

      setImagePlaceholderAttributes({
        image: img,
        x: x,
        y: y,
        width: scaledWidth,
        height: scaledHeight
      }) 
    }
  }, [imagePlaceholder, canvasSize])

  useEffect(() => {
    
    if(__status !== 'loaded') return;

    if(imagePlaceholder) {
      const canvas = maskCanvas.current;
      const ctx = canvas.getContext("2d");
      const { width, height } = canvasSize;
      canvas.width = width;
      canvas.height = height;

      ctx.globalCompositeOperation = "source-over";
      // console.log('__placeholderImage', imagePlaceholderAttributes)
      ctx.drawImage(
        __placeholderImage,
        imagePlaceholderAttributes.x, 
        imagePlaceholderAttributes.y, 
        imagePlaceholderAttributes.width, 
        imagePlaceholderAttributes.height
      );

      ctx.globalCompositeOperation = "source-in";

      // if(onLoadInit == true) {
      //   var image = new window.Image();
      //   image.src = imageOverlay.toDataURL();
      //   setOnLoadInit(false)
      // }

      // var image = new window.Image();
      // image.src = 
      imageOverlay.toDataURL();

      ctx.drawImage(imageOverlay.canvas._canvas, 0, 0, width, height); 
    } 

    const overlayNode = overlayRef.current;
    overlayNode.getLayer().batchDraw();
  })

  return <>
    {
      __status === 'loaded' && (
        <Layer listening={ false } >
          <Rect
            width={canvasSize.width}
            height={canvasSize.height}
            fill="#fafafa"
            opacity={.9}
          />
          <Image
            image={__placeholderImage}
            x={imagePlaceholderAttributes.x}
            y={imagePlaceholderAttributes.y}
            width={imagePlaceholderAttributes.width} 
            height={imagePlaceholderAttributes.height}
          />
          <Image ref={overlayRef} image={maskCanvas.current} />
        </Layer>
      )
    }
  </>
}