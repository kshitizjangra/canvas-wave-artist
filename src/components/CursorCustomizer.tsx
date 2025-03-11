
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCursor } from '@/contexts/CursorContext';
import { Switch } from "@/components/ui/switch";

export function CursorCustomizer() {
  const { setUserName, userName, setShowCustomCursor, showCustomCursor } = useCursor();
  const [nameInput, setNameInput] = useState(userName);
  const [open, setOpen] = useState(false);
  const [showCanvas, setShowCanvas] = useState(true);

  const handleSave = () => {
    if (nameInput.trim()) {
      setUserName(nameInput);
    }
    // Don't close dialog
  };

  const handleCanvasToggle = (checked: boolean) => {
    setShowCanvas(checked);
    
    // Toggle canvas visibility by manipulating the canvas element
    const canvas = document.getElementById('canvas');
    if (canvas) {
      canvas.style.display = checked ? 'block' : 'none';
    }
  };

  return (
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
  );
}
