/* xxxx-eslint-disable @typescript-eslint/no-unused-vars */

/**
 * Listens to `resize` and updates screen `width` and `height`.
 */

import React, { useState, useContext, createContext } from 'react';
import { useEvent } from 'react-use';

const ScreenSizeContext = createContext({}); // any

export const ScreenSizeProvider = ScreenSizeContext.Provider;

/*
 * export type ScreenSizeStateType = {
 *   width?: number
 *   height?: number
 * } & unknown
 */

export const getScreenSize = () => ({ // ScreenSizeStateType
  width: window.innerWidth || 0,
  height: window.innerHeight || 0,
})

export const useScreenSizeProvider = () => {
  const [screenSize, setScreenSize] = useState(getScreenSize());

  useEvent('resize', () => {
    setScreenSize(getScreenSize());
  });

  return {
    screenSize,
    setScreenSize,
  };
}

/*
 * export const ProvideScreenSize: React.FC = (args: any) => {
 *   const { children }: { children: any} = args || {};
 */

export const ProvideScreenSize = (args) => {
  const { children } = args || {};
  const props = useScreenSizeProvider();
  return (
    <ScreenSizeContext.Provider value={props}>
      {children}
    </ScreenSizeContext.Provider>
  );
}

export const useScreenSize = () => { // Function
  return useContext(ScreenSizeContext);
}
