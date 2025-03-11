
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

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
  showCustomCursor: false,
  setCursorStyle: () => {},
  setUserName: () => {},
  setShowCustomCursor: () => {}
});

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [cursorStyle, setCursorStyle] = useState('default');
  const [userName, setUserName] = useState(() => {
    // Try to load from localStorage first
    const savedName = localStorage.getItem('userName');
    return savedName || 'Guest';
  });
  const [showCustomCursor, setShowCustomCursor] = useState(false);
  const { user } = useAuth();

  // When userName changes, save to localStorage
  useEffect(() => {
    localStorage.setItem('userName', userName);
  }, [userName]);

  // If user is logged in, use their name
  useEffect(() => {
    if (user && user.user_metadata?.full_name) {
      setUserName(user.user_metadata.full_name);
    }
  }, [user]);

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
