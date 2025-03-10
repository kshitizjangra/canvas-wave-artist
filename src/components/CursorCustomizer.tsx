
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCursor } from '@/contexts/CursorContext';
import { MousePointer, Crosshair, Type, Move } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const cursorStyles = [
  { id: 'default', name: 'Default', icon: <MousePointer className="h-4 w-4" /> },
  { id: 'pointer', name: 'Pointer', icon: <MousePointer className="h-4 w-4" /> },
  { id: 'crosshair', name: 'Crosshair', icon: <Crosshair className="h-4 w-4" /> },
  { id: 'text', name: 'Text', icon: <Type className="h-4 w-4" /> },
  { id: 'move', name: 'Move', icon: <Move className="h-4 w-4" /> }
];

export function CursorCustomizer() {
  const { setCursorStyle, setUserName, userName, setShowCustomCursor, showCustomCursor } = useCursor();

  return (
    <Dialog>
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
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="custom-cursor">Enable Custom Cursor</Label>
            <Switch
              id="custom-cursor"
              checked={showCustomCursor}
              onCheckedChange={setShowCustomCursor}
            />
          </div>
          
          {!showCustomCursor && (
            <div className="grid gap-2">
              <Label>Cursor Style</Label>
              <div className="grid grid-cols-2 gap-2">
                {cursorStyles.map((style) => (
                  <Button
                    key={style.id}
                    variant="outline"
                    onClick={() => setCursorStyle(style.id)}
                    className="cursor-pointer flex justify-between items-center"
                  >
                    {style.name} {style.icon}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
