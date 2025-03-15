import { useRef, useEffect } from 'react';
import { Text } from 'react-konva';
import WebFont from 'webfontloader';
import { useAppStore } from '../context/AppContext';

export default function KonvaTextElement({ __mode, element, opacity, onDragMove, onHandleTransform, onSelect, isSelected }) {
  const { designImageFn__Ref } = useAppStore();
  const textRef = useRef(null);
  const loadFont = (font) => {
    WebFont.load({
      google: {
        families: [font]
      },
      active: function() {
        // console.log('active', font)
        textRef.current.fontFamily(font);
        textRef.current.getLayer().batchDraw();
      }
    });
  }

  useEffect(() => {
    // console.log('useEffect', element.fontFamily)
    loadFont(element.fontFamily);
  }, [element.fontFamily]);

  useEffect(() => {
    if(textRef.current) {
      textRef.current.id(`element-${element.id}`);
    }
  }, []);

  const attributes = {}
  if(opacity) {
    attributes.opacity = opacity;
  }
  if(onDragMove) {
    attributes.draggable = true;
    attributes.onDragMove = onDragMove;
  }
  if(onHandleTransform) {
    attributes.onTransformEnd = onHandleTransform;
  }
  if(onSelect) {
    attributes.onClick = e => {
      onSelect(`element-${element.id}`);
    };
  }

  let __id = `element-${ element.id }`;
  if(__mode === 'preview') {
    __id += '__preview';
  }

  return <Text 
    { ...element }
    id={ __id }
    ref={ textRef }
    { ...attributes }
  />
}