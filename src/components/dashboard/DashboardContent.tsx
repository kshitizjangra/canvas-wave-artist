
import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Download, UploadCloud, Plus } from "lucide-react";
import { useProjectService, Project } from "@/services/projectService";
import { useUsageService, UsageData } from "@/services/usageService";

import { ProjectsSection } from "./ProjectsSection";
import { OverviewTab } from "./OverviewTab";
import { AnalyticsTab } from "./AnalyticsTab";
import { SettingsTab } from "./SettingsTab";

export const DashboardContent = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [projects, setProjects] = useState<Project[]>([]);
  const [usageData, setUsageData] = useState<UsageData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const projectService = useProjectService();
  const usageService = useUsageService();
  const { toast } = useToast();

  const fetchProjects = async () => {
    setIsLoading(true);
    const projectData = await projectService.getProjects();
    setProjects(projectData);
    setIsLoading(false);
  };
  
  const fetchUsageData = async () => {
    const data = await usageService.getUsageData(30);
    setUsageData(data.length > 0 ? data : generateDummyUsageData());
  };
  
  // Generate some data if no real data exists yet
  const generateDummyUsageData = (): UsageData[] => {
    const data: UsageData[] = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      data.push({
        date: date.toISOString().split('T')[0],
        value: Math.floor(Math.random() * 4000) + 1000,
      });
    }
    
    return data.reverse();
  };
  
  useEffect(() => {
    fetchProjects();
    fetchUsageData();
    
    // Log usage for this dashboard session
    const startTime = Date.now();
    return () => {
      const duration = Math.floor((Date.now() - startTime) / 1000);
      usageService.logUsage(duration, 'dashboard_view');
    };
  }, []);
  
  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your data export has started and will be ready shortly."
    });
  };
  
  const handleUpload = () => {
    toast({
      title: "Upload Complete",
      description: "Your data has been successfully uploaded and processed."
    });
  };
  
  const handleCreateProject = () => {
    setActiveTab("projects");
  };

  return (
    <div className="flex-1 p-6 overflow-auto">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back to your dashboard</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button size="sm" variant="outline" onClick={handleUpload}>
              <UploadCloud className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button size="sm" onClick={handleCreateProject}>
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab} value={activeTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <OverviewTab projects={projects} usageData={usageData} />
          </TabsContent>
          
          <TabsContent value="projects" className="mt-6">
            <ProjectsSection 
              projects={projects}
              onRefresh={fetchProjects}
            />
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-6">
            <AnalyticsTab usageData={usageData} />
          </TabsContent>
          
          <TabsContent value="settings" className="mt-6">
            <SettingsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
