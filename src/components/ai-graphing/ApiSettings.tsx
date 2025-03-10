
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Key } from "lucide-react";

interface ApiSettingsProps {
  apiKey: string;
  setApiKey: (value: string) => void;
  envVariable: string;
  setEnvVariable: (value: string) => void;
}

export const ApiSettings = ({
  apiKey,
  setApiKey,
  envVariable,
  setEnvVariable
}: ApiSettingsProps) => {
  return (
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
  );
};
