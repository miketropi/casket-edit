import { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Rect, Text, Group, Image, Transformer } from 'react-konva';
import DesignImageToolBar from './DesignImageToolBar';
import KonvaImageElement from './KonvaImageElement';
import KonvaTextElement from './KonvaTextElement';
import { TrashIcon, Pencil } from 'lucide-react';
import Button from './Button';
import GoogleFontSelect from './fields/GoogleFontSelect';
import ColorPicker from './fields/ColorPicker';
import FontSize from './fields/FontSize';
import { v4 as uuidv4 } from 'uuid';
import Popover from './Popover';
import { useAppStore } from '../context/AppContext';
import WebFont from 'webfontloader';
import KonvaImageOverlay from './KonvaImageOverlay'; 

export default function DesignImage({ plane }) {
  const { setEditElement, setDesignImageFn__Ref } = useAppStore();
  const fnRef = useRef(null);
  const designLayerRef = useRef(null);
  const refContainer = useRef(null);
  const transformerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [selectedId, setSelectedId] = useState(null);
  const [isOpenEditText, setIsOpenEditText] = useState(false);
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

    fnRef.current = {
      exportImage: () => {
        const image = designLayerRef.current.toDataURL({ pixelRatio: 2, type: 'image/jpeg' });
        return image;
      },
    }

    setDesignImageFn__Ref(fnRef.current);

    return () => {
      setDesignImageFn__Ref(null);
    }
  }, []);

  useEffect(() => {
    setEditElement(layoutData.elements);
  }, [layoutData.elements]);

  useEffect(() => {
    
    if (selectedId !== null && transformerRef.current) {
      const stage = transformerRef.current.getStage();
      const selectedNode = stage.findOne('#' + selectedId);

      // console.log('selectedId__**', selectedId);  
      // console.log('selectedNode', stage, selectedNode, selectedId);

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
    // console.log(node);
    node.scaleX(1);
    node.scaleY(1);

    const elements = [...layoutData.elements];
    // console.log(elements[index]);
    elements[index] = {
      ...elements[index],
      rotation: node.rotation(),
      // scaleX: 1,
      // scaleY: 1,
      x: node.x(),
      y: node.y(),
      width: node.width() * scaleX,
      height: node.height() * scaleY
    };

    // console.log(elements[index])

    if(elements[index].type === 'text') {
      // elements[index].fontSize = elements[index].fontSize * scaleY;
    }

    setLayoutData({ ...layoutData, elements });
  };

  /**
   * 
   * @param {*} element 
   * @param {*} index 
   * @param {*} mode | edit | preview
   * @returns 
   */
  const renderElement = (element, index, mode = 'edit') => {

    let attributes = (() => {
      return mode === 'edit' ? {
        __mode: mode,
        opacity: 1,
        onDragMove: (e) => handleDragMove(e, index),
        onHandleTransform: (e) => handleTransform(e, index),
        onSelect: (id) => { setSelectedId(id); },
        isSelected: selectedId === `element-${element.id}`,
      } : {
        __mode: mode,
        opacity: 1
      }
    })();

    switch(element.type) {
      case 'image':
        return <KonvaImageElement
          key={element.id}
          element={element}
          { ...attributes }

          // opacity={ .3 }
          // onDragMove={ (e) => handleDragMove(e, index) }
          // onHandleTransform={ (e) => handleTransform(e, index) }
          // onSelect={ (id) => setSelectedId(id) }
          // isSelected={selectedId === `element-${element.id}`}
        />
      case 'text':
        return <KonvaTextElement
          key={element.id}
          element={element}
          { ...attributes }

          // opacity={ .3 }
          // onDragMove={ (e) => handleDragMove(e, index) }
          // onHandleTransform={ (e) => handleTransform(e, index) }
          // onSelect={ (id) => setSelectedId(id) }
          // isSelected={selectedId === `element-${element.id}`}
        />
      default:
        return null;
    }
  };

  const editTrigger = (
    <Button variant="primary" icon={<Pencil size={16} />} onClick={() => { setIsOpenEditText(!isOpenEditText) }}>Edit Text</Button>
  )

  return <div className="design-image-container">
    {/* { console.log(plane.placeholderImage) } */}
    <DesignImageToolBar
      elements={ layoutData.elements }
      onUploadImage={ (file) => {
        onAddImageElement(file);
      }}
      onAddTextElement={ () => {
        onAddTextElement("Select to edit your text");
      } }
      onOrderingChange={ (newItems) => {
        setLayoutData({ ...layoutData, elements: newItems });
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
                    <Popover
                      trigger={ editTrigger }
                      isOpen={ isOpenEditText }
                      onClose={() => { setIsOpenEditText(false) }}
                    >
                      <div>
                        <label>Text</label>
                        <textarea
                          className="textarea-field"
                          style={{ width: '280px', height: '100px' }}
                          value={element.text}
                          onChange={ e => {
                            const elements = [...layoutData.elements];
                            let index = elements.findIndex(e => e.id === editId);
                            elements[index].text = e.target.value;
                            setLayoutData({ ...layoutData, elements });
                          } }
                        />
                      </div>
                    </Popover>
                  </div>
                  <div className="design-image-tool-bar-item">
                    <GoogleFontSelect value={element.fontFamily} onChange={(font) => {
                      WebFont.load({
                        google: {
                          families: [font]
                        },
                        active: function() {
                          element.fontFamily = font;
                          setLayoutData({...layoutData, elements: [...layoutData.elements]}); 
                        }
                      });

                      // element.fontFamily = font;
                      // setLayoutData({...layoutData, elements: [...layoutData.elements]}); 
                    }} />
                  </div>
                  <div className="design-image-tool-bar-item">
                    <FontSize value={element.fontSize} onChange={(fontSize) => {
                      element.fontSize = fontSize;
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
            }}></Button>
          </div>
        </>
      }
    </DesignImageToolBar>
    <div ref={refContainer} style={{ lineHeight: 0, borderRadius: '6px', overflow: 'hidden', width: '100%', height: '560px', border: '1px solid #e0e0e0' }}>
      <Stage 
        width={ refContainer?.current?.offsetWidth }
        height={ refContainer?.current?.offsetHeight }
        onClick={(e) => {
          if(!e.target.attrs?.type) {
            setSelectedId(null);
          }
        }}
      >

        <Layer ref={designLayerRef}>
          <Rect
            width={dimensions.width}
            height={dimensions.height}
            fill="#fafafa"
          />
          {layoutData.elements.map((element, index) => renderElement(element, index))}
        </Layer>

        {/* Image placeholder */}
        <KonvaImageOverlay
          imagePlaceholder={ plane.placeholderImage }
          imageOverlay={ designLayerRef?.current }
          canvasSize={ { width: dimensions.width, height: dimensions.height } }
        />

        <Layer>
          <Transformer 
              ref={transformerRef} 
              // enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
              boundBoxFunc={(oldBox, newBox) => {
                // Limit minimum size
                if (newBox.width < 20 || newBox.height < 20) {
                  return oldBox;
                }
                return newBox;
              }}
            />
        </Layer>

      </Stage>
    </div>
    {/* { console.log(layoutData) } */}
  </div>;
}