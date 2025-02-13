import { createContext, useContext, useRef } from 'react';
import { createAppStore } from '../store/store';
import { useStore } from 'zustand';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const store = useRef(createAppStore()).current;

  return (
    <AppContext.Provider value={store}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppStore = (selector) => {
  const store = useContext(AppContext);
  if (!store) throw new Error('Missing AppContext.Provider in the tree');
  return useStore(store, selector);
}