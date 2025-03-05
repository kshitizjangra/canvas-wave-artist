
import { useEffect, useState } from "react";

export function Logo() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', updateCursorPosition);
    
    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
    };
  }, []);
  
  return (
    <div className="relative z-20">
      <h1 className="text-2xl font-bold text-primary">
        Zymatric
        <span className="text-ali">.</span>
      </h1>
      <div 
        className="pointer-events-none fixed z-50 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ali/20 duration-100 ease-linear"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          transform: `translate(-50%, -50%)`,
        }}
      />
    </div>
  );
}
