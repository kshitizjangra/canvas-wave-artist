
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface CursorContextType {
  userName: string;
  showCanvas: boolean;
  setUserName: (name: string) => void;
  setShowCanvas: (show: boolean) => void;
}

const CursorContext = createContext<CursorContextType>({
  userName: 'Guest',
  showCanvas: true,
  setUserName: () => {},
  setShowCanvas: () => {}
});

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [userName, setUserName] = useState(() => {
    // Try to load from localStorage first
    const savedName = localStorage.getItem('userName');
    return savedName || 'Guest';
  });
  const [showCanvas, setShowCanvas] = useState(true);
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
      userName, 
      showCanvas,
      setUserName,
      setShowCanvas
    }}>
      {children}
    </CursorContext.Provider>
  );
}

export const useCursor = () => useContext(CursorContext);
