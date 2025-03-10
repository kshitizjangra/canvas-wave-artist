
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LineChart, BarChart, PieChart } from "lucide-react";

interface ModelSelectionProps {
  selectedModel: string;
  setSelectedModel: (value: string) => void;
  aiModels: {
    id: string;
    name: string;
    provider: string;
  }[];
}

export const ModelSelection = ({ 
  selectedModel, 
  setSelectedModel, 
  aiModels 
}: ModelSelectionProps) => {
  // Group models by provider
  const groupedModels: Record<string, typeof aiModels> = {};
  aiModels.forEach(model => {
    if (!groupedModels[model.provider]) {
      groupedModels[model.provider] = [];
    }
    groupedModels[model.provider].push(model);
  });

  return (
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
  );
};
