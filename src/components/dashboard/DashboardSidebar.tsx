
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { DIcons } from "@/components/DIcons";
import { useToast } from "@/hooks/use-toast";

export const DashboardSidebar = () => {
  const [activeView, setActiveView] = useState('2d');
  const [aiEnabled, setAiEnabled] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false);
  const { toast } = useToast();
  
  const handleViewChange = (value: string) => {
    setActiveView(value);
    toast({
      title: `${value.toUpperCase()} View Activated`,
      description: `You've switched to ${value.toUpperCase()} view mode.`
    });
  };
  
  const toggleAI = () => {
    setAiEnabled(!aiEnabled);
    toast({
      title: aiEnabled ? "AI Disabled" : "AI Enabled",
      description: aiEnabled ? "AI insights have been turned off." : "AI insights are now active and analyzing your data."
    });
  };
  
  const toggleVoice = () => {
    setVoiceActive(!voiceActive);
    toast({
      title: voiceActive ? "Voice Control Deactivated" : "Voice Control Activated",
      description: voiceActive ? "Voice commands have been disabled." : "You can now use voice commands. Try saying 'Show charts'."
    });
  };

  return (
    <div className="w-64 border-r h-full bg-background/80 backdrop-blur-sm p-4 flex flex-col gap-4">
      <div className="p-4 rounded-lg border shadow-sm">
        <h3 className="text-sm font-medium mb-2">View Mode</h3>
        <Tabs value={activeView} onValueChange={handleViewChange} className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="2d" className="flex-1">2D</TabsTrigger>
            <TabsTrigger value="3d" className="flex-1">3D</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="p-4 rounded-lg border shadow-sm">
        <h3 className="text-sm font-medium mb-2">AI Insights</h3>
        <p className="text-xs text-muted-foreground">
          AI can help optimize your graphing experience by analyzing your data patterns.
        </p>
        <Button 
          variant={aiEnabled ? "default" : "outline"} 
          size="sm" 
          className="w-full mt-2"
          onClick={toggleAI}
        >
          {aiEnabled ? "Disable AI" : "Enable AI"}
        </Button>
      </div>
      
      <div className="p-4 rounded-lg border shadow-sm mt-auto">
        <h3 className="text-sm font-medium mb-2">Voice Control</h3>
        <Button 
          variant={voiceActive ? "default" : "outline"} 
          size="sm" 
          className="w-full"
          onClick={toggleVoice}
        >
          <DIcons.Plus className="mr-2 h-4 w-4" />
          {voiceActive ? "Deactivate Voice" : "Activate Voice"}
        </Button>
      </div>
    </div>
  );
};
