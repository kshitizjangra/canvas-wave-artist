
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardHeader } from "@/pages/Dashboard";
import { Footer } from "@/components/Footer";
import { renderCanvas } from "@/components/ui/canvas";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Send, Key, LineChart, BarChart, PieChart, Loader2 } from "lucide-react";

const AIGraphing = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState("");
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Array<{ role: string; content: string; timestamp: Date }>>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    renderCanvas();
    
    // Redirect to login if not authenticated
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  const handleSendPrompt = () => {
    if (!prompt.trim()) return;
    
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your API key first to use the AI graphing feature.",
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
      const responseMessage = {
        role: "assistant",
        content: "I've generated a graph based on your prompt. Here's a sample visualization of the data you requested.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, responseMessage]);
      setIsLoading(false);
      setPrompt("");
      
      toast({
        title: "Graph Generated",
        description: "Your AI-generated graph is now available."
      });
    }, 2000);
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
          <div>
            <h1 className="text-2xl font-bold">AI Graphing</h1>
            <p className="text-muted-foreground">Generate graphs and plots with natural language</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-4">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle className="text-xl">Settings</CardTitle>
                <CardDescription>Configure your API connection</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="apiKey" className="text-sm font-medium">API Key</label>
                  <div className="relative">
                    <Key className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="apiKey"
                      type="password"
                      placeholder="Enter your API key"
                      className="pl-9"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Your API key is required to use the AI graphing feature.</p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Available Graph Types</h3>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-1 text-xs bg-muted/50 px-2 py-1 rounded-md">
                      <LineChart className="h-3 w-3" />
                      <span>Line</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs bg-muted/50 px-2 py-1 rounded-md">
                      <BarChart className="h-3 w-3" />
                      <span>Bar</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs bg-muted/50 px-2 py-1 rounded-md">
                      <PieChart className="h-3 w-3" />
                      <span>Pie</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle className="text-xl">AI Chat</CardTitle>
                <CardDescription>Describe the graph you want to create</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-md h-[400px] overflow-y-auto p-4 space-y-4 bg-muted/20">
                  {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-2">
                      <div className="flex gap-2">
                        <LineChart className="h-6 w-6" />
                        <BarChart className="h-6 w-6" />
                        <PieChart className="h-6 w-6" />
                      </div>
                      <p>Start by describing the graph you want to create</p>
                      <p className="text-sm">Example: "Create a bar chart showing monthly sales data for 2023"</p>
                    </div>
                  ) : (
                    messages.map((message, index) => (
                      <div 
                        key={index} 
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[80%] rounded-lg px-4 py-2 ${
                            message.role === 'user' 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted'
                          }`}
                        >
                          <p>{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                  
                  {messages.length > 0 && messages[messages.length - 1].role === 'assistant' && (
                    <div className="rounded-lg border p-4 bg-card">
                      <div className="text-center text-muted-foreground">
                        <p className="text-sm mb-2">Sample Graph Visualization</p>
                        <div className="h-[200px] bg-muted/30 flex items-center justify-center rounded">
                          <p className="text-sm text-muted-foreground">Graph visualization will appear here</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Textarea 
                    placeholder="Describe the graph you want to create..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendPrompt();
                      }
                    }}
                    className="min-h-[60px]"
                  />
                  <Button 
                    onClick={handleSendPrompt}
                    disabled={isLoading || !prompt.trim()}
                    className="self-end"
                  >
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </div>
                
                <p className="text-xs text-muted-foreground">
                  Tip: Be specific about the type of graph, data, and visualization preferences.
                </p>
              </CardContent>
            </Card>
          </div>
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
