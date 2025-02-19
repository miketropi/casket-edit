import { Image, Group } from 'react-konva';

export default function KonvaImageElement({ element, onDragMove, onHandleTransform, onSelect, isSelected }) {
  const imageObj = new window.Image();
  imageObj.src = element.src;

  return <Image
    { ...element }
    id={`element-${ element.id }`}
    draggable
    onDragMove={ onDragMove }
    onTransform={ onHandleTransform }
    image={imageObj}
    width={element.width}
    height={element.height}
    onClick={ e => {
      onSelect(`element-${element.id}`);
    } }
  />
}