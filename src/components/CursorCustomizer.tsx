
import React, { useState, useEffect, ChangeEvent } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCursor } from '@/contexts/CursorContext';
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Check, Volume2, VolumeX, Music, Sparkles } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { MusicMiniPlayer } from '@/components/MusicMiniPlayer';

const musicSourceOptions = [
  { id: 'apple', name: 'Apple Music', placeholder: 'Enter Apple Music URL' },
  { id: 'spotify', name: 'Spotify', placeholder: 'Enter Spotify URL' },
  { id: 'youtube', name: 'YouTube Music', placeholder: 'Enter YouTube Music URL' },
  { id: 'custom', name: 'Custom URL', placeholder: 'Enter audio file URL (.mp3, .wav, etc.)' }
];

export function CursorCustomizer() {
  const { setUserName, userName, setShowCanvas, showCanvas } = useCursor();
  const [nameInput, setNameInput] = useState(userName);
  const [open, setOpen] = useState(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [customAudioUrl, setCustomAudioUrl] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([75]);
  const [selectedMusicSource, setSelectedMusicSource] = useState('custom');
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);
  const { toast } = useToast();
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const { user } = useAuth();

  // Load user name from auth if available
  useEffect(() => {
    if (user && user.user_metadata?.full_name) {
      setNameInput(user.user_metadata.full_name);
      setUserName(user.user_metadata.full_name);
    }
  }, [user, setUserName]);

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
      setOpen(false);
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
      setShowMiniPlayer(true);
      toast({
        title: "Music uploaded",
        description: "Your background music has been set",
      });
    }
  };

  const handleCustomUrlAdd = () => {
    if (customAudioUrl.trim()) {
      setAudioUrl(customAudioUrl);
      localStorage.setItem('backgroundMusicUrl', customAudioUrl);
      setShowMiniPlayer(true);
      toast({
        title: "Music URL added",
        description: "Your background music has been set from URL",
      });
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          toast({
            title: "Playback error",
            description: "There was an error playing this audio file. Try another one.",
            variant: "destructive",
          });
        });
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
  
  const handleVolumeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= 100) {
      setVolume([value]);
      if (audioRef.current) {
        audioRef.current.volume = value / 100;
      }
    }
  };

  const closeMiniPlayer = () => {
    setShowMiniPlayer(false);
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  React.useEffect(() => {
    // Load saved audio from localStorage
    const savedAudioUrl = localStorage.getItem('backgroundMusicUrl');
    if (savedAudioUrl) {
      setAudioUrl(savedAudioUrl);
      setShowMiniPlayer(true);
    }

    // Set volume when component loads
    if (audioRef.current) {
      audioRef.current.volume = volume[0] / 100;
    }
  }, []);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Card className="cursor-pointer hover:shadow-md transition-all duration-300 overflow-hidden bg-gradient-to-r from-purple-500/10 to-blue-500/10 dark:from-purple-900/30 dark:to-blue-900/30 border border-purple-200 dark:border-purple-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-gradient-to-r from-purple-600 to-blue-500 p-2 text-white">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Welcome to Zymatric</h3>
                  <p className="text-xs text-muted-foreground">{userName || "Guest"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
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
              <Label htmlFor="canvas-effect">Canvas Animation Effect</Label>
              <Switch
                id="canvas-effect"
                checked={showCanvas}
                onCheckedChange={handleCanvasToggle}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="music-source">Music Source</Label>
              <div className="grid grid-cols-2 gap-2">
                {musicSourceOptions.map(source => (
                  <Button
                    key={source.id}
                    variant={selectedMusicSource === source.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedMusicSource(source.id)}
                    className="justify-start"
                  >
                    {source.name}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="music-upload">Background Music</Label>
              {selectedMusicSource === 'custom' && (
                <div className="flex gap-2">
                  <Input
                    id="music-upload"
                    type="file"
                    accept="audio/*"
                    onChange={handleFileChange}
                    className="flex-1"
                  />
                </div>
              )}
              
              <div className="flex gap-2 mt-2">
                <Input
                  placeholder={musicSourceOptions.find(source => source.id === selectedMusicSource)?.placeholder || "Enter audio URL"}
                  value={customAudioUrl}
                  onChange={(e) => setCustomAudioUrl(e.target.value)}
                />
                <Button onClick={handleCustomUrlAdd}>Add</Button>
              </div>
              
              {audioUrl && (
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={togglePlay}
                      className="w-20"
                    >
                      {isPlaying ? 'Pause' : 'Play'}
                    </Button>
                    <Button 
                      variant="secondary"
                      size="sm"
                      onClick={() => setShowMiniPlayer(true)}
                    >
                      Show Mini Player
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between gap-2">
                    <Label className="leading-6">Volume</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        className="h-8 w-16 px-2 py-1"
                        type="number"
                        min={0}
                        max={100}
                        value={volume[0]}
                        onChange={handleVolumeInput}
                      />
                      <span className="text-sm">%</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <VolumeX className="shrink-0 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
                    <Slider 
                      value={volume} 
                      onValueChange={handleVolumeChange} 
                      min={0} 
                      max={100} 
                      step={1}
                      showTooltip={true}
                      tooltipContent={(value) => `${value}%`}
                    />
                    <Volume2 className="shrink-0 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
                  </div>
                </div>
              )}
            </div>
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
      
      {showMiniPlayer && audioUrl && (
        <MusicMiniPlayer
          isPlaying={isPlaying}
          togglePlay={togglePlay}
          volume={volume}
          handleVolumeChange={handleVolumeChange}
          handleVolumeInput={handleVolumeInput}
          audioSource={audioUrl}
          onClose={closeMiniPlayer}
        />
      )}
    </>
  );
}
