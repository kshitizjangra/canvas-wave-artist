
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ChatbotToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  
  const toggleChatbot = () => {
    if (!isOpen) {
      toast({
        title: "Chatbot",
        description: "The chatbot feature will be available soon!",
      });
    }
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button 
        onClick={toggleChatbot} 
        size="icon" 
        className="h-12 w-12 rounded-full shadow-lg hover:bg-ali/90 bg-ali text-white"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </Button>
      
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 rounded-lg border bg-card p-4 shadow-lg">
          <h3 className="mb-2 font-semibold">Zymatric Assistant</h3>
          <p className="text-sm text-muted-foreground">
            Our chatbot is currently under development. Stay tuned for an enhanced support experience!
          </p>
        </div>
      )}
    </div>
  );
}
