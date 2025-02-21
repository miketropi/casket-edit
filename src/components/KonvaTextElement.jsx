import { useRef, useEffect } from 'react';
import { Text } from 'react-konva';
import WebFont from 'webfontloader';
import { useAppStore } from '../context/AppContext';

export default function KonvaTextElement({ element, onDragMove, onHandleTransform, onSelect, isSelected }) {
  const { designImageFn__Ref } = useAppStore();
  const textRef = useRef(null);
  const loadFont = (font) => {
    WebFont.load({
      google: {
        families: [font]
      },
      active: function() {
        textRef.current.fontFamily(font);
        textRef.current.getLayer().batchDraw();
      }
    });
  }

  useEffect(() => {
    loadFont(element.fontFamily);
  }, [element.fontFamily]);

  useEffect(() => {
    if(textRef.current) {
      textRef.current.id(`element-${element.id}`);
    }
  }, []);

  return <Text 
    { ...element }
    id={`element-${element.id}`}
    ref={textRef}
    draggable
    onDragMove={onDragMove}
    onTransform={onHandleTransform}
    onClick={ e => { 
      // console.log(textRef.current);
      onSelect(`element-${element.id}`); } 
    }
  />
}