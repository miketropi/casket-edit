import { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Rect, Text, Group, Image, Transformer } from 'react-konva';
import DesignImageToolBar from './DesignImageToolBar';
import KonvaImageElement from './KonvaImageElement';
import KonvaTextElement from './KonvaTextElement';
import { TrashIcon } from 'lucide-react';
import Button from './Button';
import GoogleFontSelect from './fields/GoogleFontSelect';
import ColorPicker from './fields/ColorPicker';
import { v4 as uuidv4 } from 'uuid';

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
      id: uuidv4(),
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
      fill: '#000000',
      fontFamily: 'Roboto',
      align: 'center',
      lineHeight: 1.2,
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

    // console.log(elements[index])

    if(elements[index].type === 'text') {
      elements[index].fontSize = elements[index].fontSize * scaleY;
    }

    setLayoutData({ ...layoutData, elements });
  };

  const renderElement = (element, index) => {
    switch(element.type) {
      case 'image':

        return <KonvaImageElement
          key={element.id}
          element={element}
          onDragMove={ (e) => handleDragMove(e, index) }
          onHandleTransform={ (e) => handleTransform(e, index) }
          onSelect={ (id) => setSelectedId(id) }
          isSelected={selectedId === `element-${element.id}`}
        />
      case 'text':
        return <KonvaTextElement
          key={element.id}
          element={element}
          onDragMove={ (e) => handleDragMove(e, index) }
          onHandleTransform={ (e) => handleTransform(e, index) }
          onSelect={ (id) => setSelectedId(id) }
          isSelected={selectedId === `element-${element.id}`}
          onUpdateText={ (text) => {
            const elements = [...layoutData.elements];
            elements[index].text = text;
            setLayoutData({ ...layoutData, elements });
          }}
        />
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
    >
      {
        selectedId && <>
          {
            (() => {
              let editId = selectedId.replace('element-', '');
              let element = layoutData.elements.find(e => e.id === editId);
              if(element?.type && element.type === 'text') {
                return <>
                  <div className="design-image-tool-bar-item">
                    <GoogleFontSelect value={element.fontFamily} onChange={(font) => {
                      element.fontFamily = font;
                      setLayoutData({...layoutData, elements: [...layoutData.elements]}); 
                    }} />
                  </div>
                  <div className="design-image-tool-bar-item">
                    <ColorPicker value={element.fill} onChange={(color) => {
                      element.fill = color;
                      setLayoutData({...layoutData, elements: [...layoutData.elements]}); 
                    }} />
                  </div>
                </>
              }
            })()
          }

          <div className="design-image-tool-bar-item">
            <Button variant="danger" icon={<TrashIcon size={16} />} onClick={() => {
              let r = confirm("Are you sure you want to delete this element?");
              if(r == false) return;

              const elements = [...layoutData.elements];
              elements.splice(selectedId, 1);
              setLayoutData({ ...layoutData, elements });
              setSelectedId(null);
            }}>Delete</Button>
          </div>
        </>
      }
    </DesignImageToolBar>
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
          <Transformer 
            ref={transformerRef} 
            enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
          />
        </Layer>
      </Stage>
    </div>
    {JSON.stringify(layoutData)}
  </div>;
}