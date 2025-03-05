
import { useEffect, useState } from "react";

interface TypewriterProps {
  text: string[];
  delay?: number;
  loop?: boolean;
}

export function Typewriter({ text, delay = 100, loop = true }: TypewriterProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    // Handle the typing and deleting effect
    if (isDeleting) {
      if (currentText.length > 0) {
        timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, delay / 2);
      } else {
        setIsDeleting(false);
        setCurrentTextIndex((currentTextIndex + 1) % text.length);
      }
    } else {
      const fullText = text[currentTextIndex];
      if (currentText.length < fullText.length) {
        timeout = setTimeout(() => {
          setCurrentText(fullText.slice(0, currentText.length + 1));
        }, delay);
      } else {
        // Pause at the end of typing before starting to delete
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    }
    
    return () => clearTimeout(timeout);
  }, [currentText, currentTextIndex, isDeleting, text, delay, loop]);
  
  return (
    <span className="inline-block">
      {currentText}
      <span className="animate-pulse ml-1">|</span>
    </span>
  );
}
