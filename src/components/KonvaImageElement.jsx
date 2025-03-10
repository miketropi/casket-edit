import { Image, Group } from 'react-konva';

export default function KonvaImageElement({ __mode, element, opacity, onDragMove, onHandleTransform, onSelect, isSelected }) {
  const imageObj = new window.Image();
  imageObj.src = element.src;

  const attributes = {}
  if(opacity) {
    attributes.opacity = opacity;
  }
  if(onDragMove) {
    attributes.draggable = true;
    attributes.onDragMove = onDragMove;
  }
  if(onHandleTransform) {
    attributes.onTransform = onHandleTransform;
  }
  if(onSelect) {
    attributes.onClick = e => {
      // console.log('clicked', element.id);
      onSelect(`element-${element.id}`);
    };
  }

  let __id = `element-${ element.id }`;
  if(__mode === 'preview') {
    __id += '__preview';
  }

  return <Image
    { ...element }
    id={ __id }
    { ...attributes }
    image={imageObj}
    width={element.width}
    height={element.height}
  />
}