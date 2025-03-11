
import React, { createContext, useContext, useState } from 'react';

interface CursorContextType {
  cursorStyle: string;
  userName: string;
  showCustomCursor: boolean;
  setCursorStyle: (style: string) => void;
  setUserName: (name: string) => void;
  setShowCustomCursor: (show: boolean) => void;
}

const CursorContext = createContext<CursorContextType>({
  cursorStyle: 'default',
  userName: 'Guest',
  showCustomCursor: true,
  setCursorStyle: () => {},
  setUserName: () => {},
  setShowCustomCursor: () => {}
});

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [cursorStyle, setCursorStyle] = useState('default');
  const [userName, setUserName] = useState('Guest');
  const [showCustomCursor, setShowCustomCursor] = useState(true);

  return (
    <CursorContext.Provider value={{ 
      cursorStyle, 
      userName, 
      showCustomCursor,
      setCursorStyle, 
      setUserName,
      setShowCustomCursor
    }}>
      {children}
    </CursorContext.Provider>
  );
}

export const useCursor = () => useContext(CursorContext);
