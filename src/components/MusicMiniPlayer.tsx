
import React from 'react';
import { Play, Pause, X, Volume2 } from 'lucide-react';
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
  // Determine which logo to show based on the audio source URL
  const getSourceLogo = () => {
    const url = audioSource.toLowerCase();
    if (url.includes('apple') || url.includes('itunes')) {
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
          <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z" />
        </svg>
      );
    } else if (url.includes('spotify')) {
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
      );
    } else if (url.includes('youtube')) {
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    } else {
      // Default music icon
      return <Volume2 className="h-4 w-4" />;
    }
  };

  return (
    <Card className="fixed bottom-4 right-4 z-50 w-64 shadow-lg animate-slideUp">
      <CardContent className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {getSourceLogo()}
            <span className="text-xs font-medium">Now Playing</span>
          </div>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onClose}>
            <X className="h-3 w-3" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          
          <div className="flex-1 space-y-1">
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
