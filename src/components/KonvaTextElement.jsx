import { useRef, useEffect } from 'react';
import { Text, Group } from 'react-konva';
import { Html } from 'react-konva-utils';
import Popover from './Popover';
import WebFont from 'webfontloader';
import { Text as TextIcon, Pencil } from 'lucide-react';
import { useState } from 'react';
export default function KonvaTextElement({ element, onDragMove, onHandleTransform, onSelect, onUpdateText, isSelected }) {
  const textRef = useRef(null);
  const groupRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
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
      console.log(groupRef.current);
      // console.log(textRef.current);
      // console.log(textRef.current.width());
    }
  });

  const editTrigger = (
    <div 
    onClick={() => { setIsOpen(!isOpen) }} 
    style={{ fontSize: '10px', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', background: 'black', color: 'white', padding: '4px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>
      <Pencil size={ 10 } /> 
      <span>edit text</span>
    </div>
  )

  return <Group
    ref={groupRef}
    id={`element-${element.id}`}
    draggable
    onDragMove={onDragMove}
    onTransformEnd={onHandleTransform}
    onClick={ e => { onSelect(`element-${element.id}`); } }
    x={element.x}
    y={element.y}
    width={ textRef?.current?.width() }
    height={ textRef?.current?.height() }
  >
    {
      isSelected && <Html 
        divProps={{
          style: {
            position: 'absolute',
            top: `${ textRef?.current?.height() + 5 }px`,
            left: '0px',
          },
        }}> 
        <Popover 
          isOpen={ isOpen } 
          trigger={ editTrigger } 
          onClose={() => { setIsOpen(false) }}>
          <div>
            <label>Edit Text</label>
            <textarea
              value={element.text}
              onChange={ e => { onUpdateText(e.target.value) } }
              style={{
                width: '100%',
                minHeight: '100px',
                padding: '8px',
                fontFamily: 'inherit',
                border: '1px solid #e6e6e6',
                borderRadius: '4px',
                resize: 'vertical',
                boxSizing: 'border-box',
              }}
            ></textarea>
            { element.text }
          </div>
        </Popover>
      </Html>
    }
    <Text
      ref={textRef}
      text={element.text}
      fontSize={element.fontSize}
      fontFamily={`'${element.fontFamily}'`}
      fill={element.fill}
      width={element.width}
      height={element.height} 
      align={element.align}
      lineHeight={element.lineHeight}
    />
  </Group>;
}