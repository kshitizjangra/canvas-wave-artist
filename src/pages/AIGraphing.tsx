
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardHeader } from "@/pages/Dashboard";
import { Footer } from "@/components/Footer";
import { renderCanvas } from "@/components/ui/canvas";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Send, 
  Key, 
  LineChart, 
  BarChart, 
  PieChart, 
  Loader2,
  ChevronDown,
  Settings
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  // AI models available for selection
  const aiModels = [
    { id: "gpt-4", name: "ChatGPT (GPT-4)", provider: "OpenAI" },
    { id: "gpt-3.5-turbo", name: "ChatGPT (GPT-3.5)", provider: "OpenAI" },
    { id: "gemini-pro", name: "Gemini Pro", provider: "Google" },
    { id: "gemini-ultra", name: "Gemini Ultra", provider: "Google" },
    { id: "deepseek-coder", name: "DeepSeek Coder", provider: "DeepSeek" },
    { id: "llama-3-70b", name: "Llama 3 (70B)", provider: "Meta" },
    { id: "llama-3-8b", name: "Llama 3 (8B)", provider: "Meta" },
    { id: "ollama-local", name: "Ollama (Local)", provider: "Local" },
    { id: "lmstudio-local", name: "LM Studio (Local)", provider: "Local" }
  ];

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
      const modelName = aiModels.find(m => m.id === selectedModel)?.name || selectedModel;
      
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

  // Group models by provider
  const groupedModels: Record<string, typeof aiModels> = {};
  aiModels.forEach(model => {
    if (!groupedModels[model.provider]) {
      groupedModels[model.provider] = [];
    }
    groupedModels[model.provider].push(model);
  });

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
                <Card className="md:col-span-1">
                  <CardHeader>
                    <CardTitle className="text-xl">Model Selection</CardTitle>
                    <CardDescription>Choose your preferred AI model</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="apiModel" className="text-sm font-medium">AI Model</label>
                      <Select 
                        value={selectedModel} 
                        onValueChange={setSelectedModel}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a model" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(groupedModels).map(([provider, models]) => (
                            <div key={provider}>
                              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                                {provider}
                              </div>
                              {models.map(model => (
                                <SelectItem key={model.id} value={model.id}>
                                  {model.name}
                                </SelectItem>
                              ))}
                              {provider !== Object.keys(groupedModels)[Object.keys(groupedModels).length - 1] && (
                                <div className="my-1 h-px bg-muted"></div>
                              )}
                            </div>
                          ))}
                        </SelectContent>
                      </Select>
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
                            <p className="text-sm mb-2">
                              {aiModels.find(m => m.id === selectedModel)?.name || selectedModel} Graph Visualization
                            </p>
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
                        disabled={isLoading || !prompt.trim() || (!apiKey && !envVariable)}
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
            </TabsContent>
            
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>API Configuration</CardTitle>
                  <CardDescription>Configure your API connection settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
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
                      <p className="text-xs text-muted-foreground">Your API key is required to use the AI graphing feature with external models.</p>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="envVariable" className="text-sm font-medium">Environment Variable (Optional)</label>
                      <Input 
                        id="envVariable"
                        placeholder="Enter environment variable name (e.g., OPENAI_API_KEY)"
                        value={envVariable}
                        onChange={(e) => setEnvVariable(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">Alternatively, you can specify the name of an environment variable that contains your API key.</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Advanced Settings</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label htmlFor="modelTemperature" className="text-sm font-medium">Model Temperature</label>
                        <Input 
                          id="modelTemperature"
                          type="number"
                          min="0"
                          max="1"
                          step="0.1"
                          placeholder="0.7"
                        />
                        <p className="text-xs text-muted-foreground">Controls randomness: 0 is deterministic, 1 is creative.</p>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="maxTokens" className="text-sm font-medium">Max Tokens</label>
                        <Input 
                          id="maxTokens"
                          type="number"
                          min="100"
                          placeholder="1000"
                        />
                        <p className="text-xs text-muted-foreground">Maximum number of tokens to generate.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button">Reset</Button>
                  <Button type="button">Save Settings</Button>
                </CardFooter>
              </Card>
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
