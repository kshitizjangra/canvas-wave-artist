
import React, { useEffect } from 'react';
import { useCursor } from '@/contexts/CursorContext';
import { Pointer } from '@/components/ui/custom-cursor';

interface GlobalCursorProps {
  children: React.ReactNode;
}

export const GlobalCursor: React.FC<GlobalCursorProps> = ({ children }) => {
  const { showCustomCursor, userName, cursorStyle } = useCursor();

  useEffect(() => {
    if (!showCustomCursor && cursorStyle !== 'default') {
      document.body.style.cursor = cursorStyle;
    } else {
      document.body.style.cursor = 'auto';
    }

    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [cursorStyle, showCustomCursor]);

  if (showCustomCursor) {
    return <Pointer name={userName || "Guest"} className="min-h-screen">{children}</Pointer>;
  }

  return <>{children}</>;
};
