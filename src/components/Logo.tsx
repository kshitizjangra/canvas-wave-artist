
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function Logo() {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [cursorVisible, setCursorVisible] = useState(true);
  const fullText = "Zymatric";
  
  // Handle the typewriter effect
  useEffect(() => {
    // Duration for typing each character
    const typingSpeed = 150;
    // Duration for pause before erasing
    const pauseBeforeErase = 2000;
    // Duration for pause before typing again
    const pauseBeforeType = 800;
    
    let timeout: NodeJS.Timeout;
    
    if (isTyping) {
      if (displayText.length < fullText.length) {
        // Typing forward
        timeout = setTimeout(() => {
          setDisplayText(fullText.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        // Pause at the end before erasing
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, pauseBeforeErase);
      }
    } else {
      if (displayText.length > 0) {
        // Erasing
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, typingSpeed / 2);
      } else {
        // Pause before typing again
        timeout = setTimeout(() => {
          setIsTyping(true);
        }, pauseBeforeType);
      }
    }
    
    // Cursor blink effect
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);
    
    return () => {
      clearTimeout(timeout);
      clearInterval(cursorInterval);
    };
  }, [displayText, isTyping, fullText]);
  
  return (
    <div className="relative z-20">
      <h1 className="text-2xl font-bold text-primary flex items-center">
        {displayText}
        <span 
          className={cn(
            "ml-0.5 inline-block transition-opacity duration-100",
            cursorVisible ? "opacity-100" : "opacity-0"
          )}
          style={{ 
            color: "#0ea5e9", 
            fontSize: "1.75rem",
            fontWeight: "bold",
            position: "relative",
            width: "0.5rem",
            height: "1.5rem",
            transform: "rotate(6deg)",
            borderRadius: "2px",
            backgroundColor: "#0ea5e9"
          }}
        >
        </span>
        {!isTyping && displayText.length === 0 ? (
          <span className="text-ali font-bold">.</span>
        ) : (
          displayText.length === fullText.length && isTyping && (
            <span className="text-ali font-bold">.</span>
          )
        )}
      </h1>
    </div>
  );
}
