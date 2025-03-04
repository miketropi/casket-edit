import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import planes from './planes';
import api from '../lib/api';

const apiInstance = new api();

const rotationSetupInit = {
  '__lid': [-1.57, 0, 0],           // lid
  '__right': [0, 1.57, 0],          // right
  '__left': [0, -1.57, 0],          // left
  '__food': [0, 0, 0],              // food
  '__head': [0, 0, 0],              // head
}

const defaultProps = {
  version: '1.0.0',
  apiInstance,
  name: 'Casket Edit',
  developMode: false,
  rotationSetupInit,
  planes,
  imagesUsed: [],
  decalsImageDesign: {
    Lid: '',
    Right: '',
    Left: '',
    Bottom: '', 
    Top: '',
  },
  editElement: [],
  designImageFn__Ref: null,
}

export const createAppStore = (initProps) => {
  return create(
    immer((set, get) => {
      return {
        ...initProps,
        ...defaultProps,
        setPlanes: (planes) => {
          set({ planes });
        },
        addPlane: (plane) => {
          set((state) => {
            const exists = state.planes.some(p => p.name === plane.name);
            if (!exists) {
              state.planes.push(plane);
            }
          });
        },
        removePlane: (planeName) => {
          set((state) => {
            state.planes = state.planes.filter((p) => p.name !== planeName);
          });
        },
        updatePlane: (planeName, updatedPlane) => {
          set((state) => {
            const index = state.planes.findIndex((p) => p.name === planeName);
            state.planes[index] = updatedPlane;
          });
        },
        setEditElement: (editElement) => {
          set({ editElement });
        },
        setElementsToPlane: (planeName, elements) => {
          set((state) => {
            const index = state.planes.findIndex((p) => p.name === planeName);
            if (index !== -1) {
              state.planes[index].elements = elements;
            }
          });
        },
        setDesignImageFn__Ref: (designImageFn__Ref) => {
          set({ designImageFn__Ref });
        },
        onSaveDesign: async () => {
          // let dataSave = get().planes;
          // const response = await apiInstance.saveDesign(dataSave);
          // return response;
        },
        onSetDecalsImageDesign: (planeName, image) => {
          set((state) => {
            state.decalsImageDesign[planeName] = image;
          });
        }, 
        onPushImagesUsed: (image) => {
          set((state) => {
            state.imagesUsed.push(image);
          });
        }
      }
    })
  )
}