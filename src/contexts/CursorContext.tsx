
import React, { createContext, useContext, useState } from 'react';

interface CursorContextType {
  cursorStyle: string;
  userName: string;
  setCursorStyle: (style: string) => void;
  setUserName: (name: string) => void;
}

const CursorContext = createContext<CursorContextType>({
  cursorStyle: 'default',
  userName: '',
  setCursorStyle: () => {},
  setUserName: () => {}
});

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [cursorStyle, setCursorStyle] = useState('default');
  const [userName, setUserName] = useState('');

  return (
    <CursorContext.Provider value={{ cursorStyle, userName, setCursorStyle, setUserName }}>
      {children}
    </CursorContext.Provider>
  );
}

export const useCursor = () => useContext(CursorContext);
