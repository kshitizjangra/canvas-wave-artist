
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, X, Volume2, ChevronDown, ChevronUp, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

interface MusicMiniPlayerProps {
  isPlaying: boolean;
  togglePlay: () => void;
  volume: number[];
  handleVolumeChange: (newValue: number[]) => void;
  handleVolumeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  audioSource: string;
  onClose: () => void;
}

export const MusicMiniPlayer: React.FC<MusicMiniPlayerProps> = ({
  isPlaying,
  togglePlay,
  volume,
  handleVolumeChange,
  handleVolumeInput,
  audioSource,
  onClose
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [minimized, setMinimized] = useState(false);
  const [audioData, setAudioData] = useState<number[]>(Array(15).fill(5));
  const playerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  
  // Initialize position from localStorage or default position
  useEffect(() => {
    const savedPosition = localStorage.getItem('miniPlayerPosition');
    if (savedPosition) {
      setPosition(JSON.parse(savedPosition));
    } else {
      setPosition({ x: window.innerWidth - 280, y: window.innerHeight - 160 });
    }
  }, []);

  // Save position to localStorage when it changes
  useEffect(() => {
    if (!isDragging) {
      localStorage.setItem('miniPlayerPosition', JSON.stringify(position));
    }
  }, [position, isDragging]);

  // Handle mouse down for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (dragRef.current && dragRef.current.contains(e.target as Node)) {
      setIsDragging(true);
      // Calculate the offset of the mouse from the top-left of the player
      const rect = playerRef.current?.getBoundingClientRect();
      if (rect) {
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    }
  };

  // Handle mouse move for dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = Math.max(0, Math.min(window.innerWidth - 280, e.clientX - dragOffset.x));
        const newY = Math.max(0, Math.min(window.innerHeight - 120, e.clientY - dragOffset.y));
        setPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  // Generate audio visualization
  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        // Generate random heights for the audio bars when music is playing
        setAudioData(Array(15).fill(0).map(() => Math.floor(Math.random() * 20) + 5));
      }, 200);
      return () => clearInterval(timer);
    }
  }, [isPlaying]);

  return (
    <div 
      ref={playerRef}
      className="fixed z-50 transition-all"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'default',
      }}
      onMouseDown={handleMouseDown}
    >
      <Card className={`shadow-lg w-64 ${isDragging ? 'opacity-80' : 'opacity-100'}`}>
        <div 
          ref={dragRef} 
          className="h-6 bg-muted/50 rounded-t-lg flex items-center justify-between px-2 cursor-grab"
        >
          <div className="flex items-center">
            <GripVertical className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground ml-1">Drag to move</span>
          </div>
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-4 w-4 p-0" 
              onClick={() => setMinimized(!minimized)}
            >
              {minimized ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </Button>
            <Button variant="ghost" size="icon" className="h-4 w-4 p-0" onClick={onClose}>
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
        
        {!minimized && (
          <CardContent className="p-3">
            <div className="flex items-center gap-2 mb-3">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8"
                onClick={togglePlay}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              
              <div className="flex-1">
                <div className="h-8 flex items-center justify-center gap-[2px]">
                  {audioData.map((height, index) => (
                    <div 
                      key={index}
                      className="w-1 bg-gradient-to-t from-purple-500 to-blue-500 rounded-full transition-all duration-200"
                      style={{ 
                        height: isPlaying ? `${height}px` : '2px',
                        opacity: isPlaying ? 1 : 0.5
                      }}
                    />
                  ))}
                </div>
              </div>
              
              <Volume2 className="h-4 w-4 text-muted-foreground" />
            </div>
            
            <div className="flex items-center gap-2">
              <Slider 
                value={volume} 
                onValueChange={handleVolumeChange} 
                min={0} 
                max={100} 
                step={1}
                showTooltip={true}
                tooltipContent={(value) => `${value}%`}
                className="w-full"
              />
              <Input
                className="h-6 w-12 px-1 py-0 text-xs"
                type="number"
                min={0}
                max={100}
                value={volume[0]}
                onChange={handleVolumeInput}
              />
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};
