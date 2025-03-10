
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCursor } from '@/contexts/CursorContext';

const cursorStyles = [
  { id: 'default', name: 'Default' },
  { id: 'pointer', name: 'Pointer' },
  { id: 'crosshair', name: 'Crosshair' },
  { id: 'text', name: 'Text' },
  { id: 'move', name: 'Move' }
];

export function CursorCustomizer() {
  const { setCursorStyle, setUserName, userName } = useCursor();

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
          <div className="grid gap-2">
            <Label>Cursor Style</Label>
            <div className="grid grid-cols-2 gap-2">
              {cursorStyles.map((style) => (
                <Button
                  key={style.id}
                  variant="outline"
                  onClick={() => setCursorStyle(style.id)}
                  className="cursor-pointer"
                >
                  {style.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
