import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import planes from './planes';

const rotationSetupInit = {
  '__lid': [-1.57, 0, 0],           // lid
  '__right': [0, 1.57, 0],          // right
  '__left': [0, -1.57, 0],          // left
  '__food': [0, 0, 0],              // food
  '__head': [0, 0, 0],              // head
}

const defaultProps = {
  version: '1.0.0',
  name: 'Casket Edit',
  developMode: true,
  rotationSetupInit,
  planes
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
      }
    })
  )
}