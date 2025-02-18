import { Image, Group } from 'react-konva';

export default function KonvaImageElement({ element, onDragMove, onHandleTransform, onSelect, isSelected }) {
  const imageObj = new window.Image();
  imageObj.src = element.src;

  return <Group
    id={`element-${ element.id }`}
    draggable
    onDragMove={ onDragMove }
    onTransformEnd={ onHandleTransform }
    x={element.x}
    y={element.y}
    width={element.width}
    height={element.height}
    onClick={ e => {
      onSelect(`element-${element.id}`);
    } }
  >
    <Image
      image={imageObj}
      width={element.width}
      height={element.height}
    />
  </Group>;
}