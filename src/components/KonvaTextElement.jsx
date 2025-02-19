import { useRef, useEffect } from 'react';
import { Text, Group } from 'react-konva';
import { Html } from 'react-konva-utils';
import Popover from './Popover';
import WebFont from 'webfontloader';
import { Text as TextIcon, Pencil } from 'lucide-react';
import { useState } from 'react';
export default function KonvaTextElement({ element, onDragMove, onHandleTransform, onSelect, isSelected }) {
  const textRef = useRef(null);
  const groupRef = useRef(null);
  const loadFont = (font) => {
    WebFont.load({
      google: {
        families: [font]
      },
      active: function() {
        textRef.current.fontFamily(font);
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
      console.log(textRef.current);
      onSelect(`element-${element.id}`); } 
    }
  />

  // return <Group
  //   ref={groupRef}
  //   id={`element-${element.id}`}
  //   draggable
  //   onDragMove={onDragMove}
  //   onTransformEnd={onHandleTransform}
  //   onClick={ e => { onSelect(`element-${element.id}`); } }
  //   x={element.x}
  //   y={element.y}
  //   width={ textRef?.current?.width() }
  //   height={ textRef?.current?.height() }
  // >
  //   <Text
  //     ref={textRef}
  //     text={element.text}
  //     fontSize={element.fontSize}
  //     fontFamily={`'${element.fontFamily}'`}
  //     fill={element.fill}
  //     width={element.width}
  //     height={element.height} 
  //     align={element.align}
  //     lineHeight={element.lineHeight}
  //   />
  // </Group>;
}