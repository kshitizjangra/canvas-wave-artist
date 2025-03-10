
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2, LineChart, BarChart, PieChart } from "lucide-react";

interface Message {
  role: string;
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  messages: Message[];
  prompt: string;
  setPrompt: (value: string) => void;
  handleSendPrompt: () => void;
  isLoading: boolean;
  selectedModel: string;
  apiKey: string;
  envVariable: string;
  aiModels: {
    id: string;
    name: string;
    provider: string;
  }[];
}

export const ChatInterface = ({
  messages,
  prompt,
  setPrompt,
  handleSendPrompt,
  isLoading,
  selectedModel,
  apiKey,
  envVariable,
  aiModels
}: ChatInterfaceProps) => {
  return (
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
  );
};
