import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const defaultProps = {
  version: '1.0.0',
  name: 'Casket Edit',
  developMode: true,
  planes: [],
}

export const createAppStore = (initProps) => {
  return create(
    immer((set, get) => {
      return {
        ...initProps,
        ...defaultProps,
        addPlane: (plane) => {
          set((state) => {
            const exists = state.planes.some(p => p.uuid === plane.uuid);
            if (!exists) {
              state.planes.push(plane);
            }
          });
        },
        removePlane: (planeID) => {
          set((state) => {
            state.planes = state.planes.filter((p) => p.uuid !== planeID);
          });
        },
      }
    })
  )
}