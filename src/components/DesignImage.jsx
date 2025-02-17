import { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Rect, Text, Group, Image, Transformer } from 'react-konva';
import DesignImageToolBar from './DesignImageToolBar';

export default function DesignImage({ plane, onUseDesign }) {
  const refContainer = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [selectedId, setSelectedId] = useState(null);
  const transformerRef = useRef(null);
  const [layoutData, setLayoutData] = useState({
    elements: []
  });

  useEffect(() => {
    if (refContainer.current) {
      setDimensions({
        width: refContainer.current.offsetWidth,
        height: refContainer.current.offsetHeight
      });
    }

    setLayoutData({ ...layoutData, elements: plane.elements ? plane.elements : [] })
  }, []);

  useEffect(() => {
    if (selectedId !== null && transformerRef.current) {
      const stage = transformerRef.current.getStage();
      const selectedNode = stage.findOne('#' + selectedId);
      if (selectedNode) {
        transformerRef.current.nodes([selectedNode]);
      }
    } else if (transformerRef.current) {
      transformerRef.current.nodes([]);
    }
  }, [selectedId]);

  const handleAddElement = (element) => {
    const newElement = {
      ...element,
      x: dimensions.width / 2,
      y: dimensions.height / 2,
      // width: element.type === 'image' ? 100 : undefined,
      // height: element.type === 'image' ? 100 : undefined,
    };

    if (element.type === 'image') {
      const img = new window.Image();
      img.src = element.src;
      img.onload = () => {
        const imgRatio = img.width / img.height;
        let newWidth = 100;
        let newHeight = 100;

        if (imgRatio > 1) {
          // Image is wider than tall
          newWidth = Math.min(dimensions.width, img.width);
          newHeight = newWidth / imgRatio;
          
          if (newHeight > dimensions.height) {
            newHeight = dimensions.height;
            newWidth = newHeight * imgRatio;
          }
        } else {
          // Image is taller than wide
          newHeight = Math.min(dimensions.height, img.height);
          newWidth = newHeight * imgRatio;
          
          if (newWidth > dimensions.width) {
            newWidth = dimensions.width;
            newHeight = newWidth / imgRatio;
          }
        }

        newElement.width = newWidth;
        newElement.height = newHeight;

        setLayoutData({
          ...layoutData,
          elements: [...layoutData.elements, newElement]
        });
      };
      return;
    }

    setLayoutData({
      ...layoutData,
      elements: [...layoutData.elements, newElement]
    });
  };

  const onAddImageElement = (imageUrl) => {
    handleAddElement({
      type: 'image',
      src: imageUrl
    });
  };

  const onAddTextElement = (text = 'New Text') => {
    handleAddElement({
      type: 'text',
      text: text,
      fontSize: 20,
      fill: '#000000'
    });
  };

  const handleDragMove = (e, index) => {
    const elements = [...layoutData.elements];
    elements[index] = {
      ...elements[index],
      x: e.target.x(),
      y: e.target.y()
    };
    setLayoutData({ ...layoutData, elements });
  };

  const handleTransform = (e, index) => {
    const node = e.target;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    node.scaleX(1);
    node.scaleY(1);

    const elements = [...layoutData.elements];
    elements[index] = {
      ...elements[index],
      x: node.x(),
      y: node.y(),
      width: node.width() * scaleX,
      height: node.height() * scaleY
    };

    setLayoutData({ ...layoutData, elements });
  };

  const renderElement = (element, index) => {
    switch(element.type) {
      case 'image':
        const imageObj = new window.Image();
        imageObj.src = element.src;
        return (
          <Group 
            key={index}
            id={`element-${index}`}
            draggable
            onDragMove={(e) => handleDragMove(e, index)}
            onTransformEnd={(e) => handleTransform(e, index)}
            x={element.x}
            y={element.y}
            width={element.width}
            height={element.height}
            onClick={() => setSelectedId(`element-${index}`)}
          >
            <Image
              image={imageObj}
              width={element.width}
              height={element.height}
            />
          </Group>
        );
      case 'text':
        return (
          <Group 
            key={index}
            id={`element-${index}`}
            draggable
            onDragMove={(e) => handleDragMove(e, index)}
            onTransformEnd={(e) => handleTransform(e, index)}
            x={element.x}
            y={element.y}
            width={element?.width || undefined}
            height={element?.height || undefined}
            onClick={() => setSelectedId(`element-${index}`)}
          >
            <Text
              text={element.text}
              fontSize={element.fontSize}
              fill={element.fill}
            />
          </Group>
        );
      default:
        return null;
    }
  };

  return <div className="design-image-container">
    <DesignImageToolBar
      onUploadImage={ (file) => {
        onAddImageElement(file);
      }}
      onAddTextElement={ () => {
        onAddTextElement("Select to edit your text");
      } }
     />
    <div ref={refContainer} style={{ lineHeight: 0, borderRadius: '6px', overflow: 'hidden', width: '100%', height: '700px' }}>
      <Stage 
        width={dimensions.width} 
        height={dimensions.height}
        onClick={(e) => {
          if (e.target === e.target.getStage()) {
            setSelectedId(null);
          }
        }}
      >
        <Layer>
          <Rect
            width={dimensions.width}
            height={dimensions.height}
            fill="#fafafa"
          />
        </Layer>
        <Layer>
          {layoutData.elements.map((element, index) => renderElement(element, index))}
          <Transformer ref={transformerRef} />
        </Layer>
      </Stage>
    </div>
    {JSON.stringify(layoutData)}
  </div>;
}