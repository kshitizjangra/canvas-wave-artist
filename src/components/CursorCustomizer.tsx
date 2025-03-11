
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCursor } from '@/contexts/CursorContext';
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Check } from "lucide-react";
import { Slider } from "@/components/ui/slider";

export function CursorCustomizer() {
  const { setUserName, userName, setShowCustomCursor, showCustomCursor } = useCursor();
  const [nameInput, setNameInput] = useState(userName);
  const [open, setOpen] = useState(false);
  const [showCanvas, setShowCanvas] = useState(true);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([75]);
  const { toast } = useToast();
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const handleSave = () => {
    if (nameInput.trim()) {
      setUserName(nameInput);
      toast({
        title: "Changes saved",
        description: "Your preferences have been updated successfully",
        variant: "default",
        action: (
          <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
            <Check className="h-4 w-4 text-white" />
          </div>
        ),
      });
    }
  };

  const handleCanvasToggle = (checked: boolean) => {
    setShowCanvas(checked);
    
    // Toggle canvas visibility by manipulating the canvas element
    const canvas = document.getElementById('canvas');
    if (canvas) {
      canvas.style.display = checked ? 'block' : 'none';
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith('audio/')) {
      setAudioFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setAudioUrl(url);
      localStorage.setItem('backgroundMusicUrl', url);
      toast({
        title: "Music uploaded",
        description: "Your background music has been set",
      });
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (newValue: number[]) => {
    setVolume(newValue);
    if (audioRef.current) {
      audioRef.current.volume = newValue[0] / 100;
    }
  };

  React.useEffect(() => {
    // Load saved audio from localStorage
    const savedAudioUrl = localStorage.getItem('backgroundMusicUrl');
    if (savedAudioUrl) {
      setAudioUrl(savedAudioUrl);
    }
  }, []);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div className="relative flex items-center whitespace-nowrap rounded-full border bg-popover px-3 py-1 text-xs leading-6 text-primary/60 hover:bg-accent cursor-pointer">
            <div className="flex items-center gap-1">
              Introducing Zymatric
            </div>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Customize Your Experience</DialogTitle>
            <DialogDescription>Personalize your interaction with Zymatric</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Your Name</Label>
              <div className="flex gap-2">
                <Input
                  id="name"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Enter your name"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSave();
                    }
                  }}
                />
                <Button onClick={handleSave}>Save</Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="custom-cursor">Custom Cursor</Label>
              <Switch
                id="custom-cursor"
                checked={showCustomCursor}
                onCheckedChange={setShowCustomCursor}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="canvas-effect">Canvas Animation Effect</Label>
              <Switch
                id="canvas-effect"
                checked={showCanvas}
                onCheckedChange={handleCanvasToggle}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="music-upload">Background Music</Label>
              <div className="flex gap-2">
                <Input
                  id="music-upload"
                  type="file"
                  accept="audio/*"
                  onChange={handleFileChange}
                  className="flex-1"
                />
                {audioUrl && (
                  <Button 
                    variant="outline" 
                    onClick={togglePlay}
                  >
                    {isPlaying ? 'Pause' : 'Play'}
                  </Button>
                )}
              </div>
              
              {audioUrl && (
                <div className="mt-2">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <Label className="leading-6">Volume</Label>
                      <output className="text-sm font-medium tabular-nums">{volume[0]}</output>
                    </div>
                    <Slider 
                      value={volume} 
                      onValueChange={(v) => handleVolumeChange(v)} 
                      min={0} 
                      max={100} 
                      step={1}
                      showTooltip={true}
                      tooltipContent={(value) => `${value}%`}
                    />
                  </div>
                </div>
              )}
            </div>
            
            {!showCustomCursor && (
              <div className="grid gap-2">
                <Label>Default Cursor Style</Label>
                <div className="grid grid-cols-1 gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {}}
                    className="cursor-pointer flex justify-between items-center"
                  >
                    Default <span className="h-4 w-4">🖱️</span>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          loop
          style={{ display: 'none' }}
        />
      )}
    </>
  );
}
