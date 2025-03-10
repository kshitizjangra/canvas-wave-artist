
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardHeader } from "@/pages/Dashboard";
import { Footer } from "@/components/Footer";
import { renderCanvas } from "@/components/ui/canvas";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ModelSelection } from "@/components/ai-graphing/ModelSelection";
import { ChatInterface } from "@/components/ai-graphing/ChatInterface";
import { ApiSettings } from "@/components/ai-graphing/ApiSettings";
import { AI_MODELS } from "@/components/ai-graphing/constants";

const AIGraphing = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState("");
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Array<{ role: string; content: string; timestamp: Date }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState("gpt-4");
  const [envVariable, setEnvVariable] = useState("");

  useEffect(() => {
    renderCanvas();
    
    // Redirect to login if not authenticated
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  const handleSendPrompt = () => {
    if (!prompt.trim()) return;
    
    if (!apiKey && !envVariable) {
      toast({
        title: "API Key Required",
        description: "Please enter your API key or set an environment variable to use the AI graphing feature.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Add user message to chat
    const newMessage = {
      role: "user",
      content: prompt,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Simulate AI response (to be replaced with actual API call later)
    setTimeout(() => {
      const modelName = AI_MODELS.find(m => m.id === selectedModel)?.name || selectedModel;
      
      const responseMessage = {
        role: "assistant",
        content: `I've generated a graph based on your prompt using ${modelName}. Here's the visualization of the data you requested.`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, responseMessage]);
      setIsLoading(false);
      setPrompt("");
      
      toast({
        title: "Graph Generated",
        description: `Your AI-generated graph using ${modelName} is now available.`
      });
    }, 2000);
  };

  const clearChat = () => {
    setMessages([]);
    toast({
      title: "Chat Cleared",
      description: "Your conversation history has been cleared."
    });
  };

  // If still loading or user is null, don't render content
  if (loading || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardHeader />
      
      <div className="flex-1 p-6 overflow-auto">
        <div className="flex flex-col gap-6 max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">AI Graphing</h1>
              <p className="text-muted-foreground">Generate graphs and plots with natural language</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={clearChat}>
                Clear Chat
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="chat" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-4">
                <ModelSelection 
                  selectedModel={selectedModel}
                  setSelectedModel={setSelectedModel}
                  aiModels={AI_MODELS}
                />
                
                <ChatInterface 
                  messages={messages}
                  prompt={prompt}
                  setPrompt={setPrompt}
                  handleSendPrompt={handleSendPrompt}
                  isLoading={isLoading}
                  selectedModel={selectedModel}
                  apiKey={apiKey}
                  envVariable={envVariable}
                  aiModels={AI_MODELS}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="settings">
              <ApiSettings 
                apiKey={apiKey}
                setApiKey={setApiKey}
                envVariable={envVariable}
                setEnvVariable={setEnvVariable}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
      
      <canvas
        className="bg-skin-base pointer-events-none absolute inset-0 mx-auto"
        id="canvas"
      ></canvas>
    </div>
  );
};

export default AIGraphing;
