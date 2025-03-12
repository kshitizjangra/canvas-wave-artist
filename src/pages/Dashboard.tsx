
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { renderCanvas } from "@/components/ui/canvas";
import { Logo } from "@/components/Logo";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DIcons } from "@/components/DIcons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { AreaChart, Area } from "recharts";
import { useToast } from "@/hooks/use-toast";
import { ProjectsSection } from "@/components/dashboard/ProjectsSection";
import { useProjectService, Project } from "@/services/projectService";
import { useUsageService, UsageData } from "@/services/usageService";
import { 
  ChartPie, 
  Users, 
  LayoutDashboard, 
  Settings, 
  Search, 
  ChartBar, 
  Plus, 
  Download, 
  UploadCloud, 
  CheckCircle,
  Sparkles
} from "lucide-react";

// Create Dashboard sidebar component
const DashboardSidebar = () => {
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

// Create Dashboard header component
export const DashboardHeader = () => {
  const { signOut, user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    console.log("Searching for:", searchQuery);
  };

  return (
    <header className="z-10 p-4 bg-background/80 backdrop-blur-sm border-b flex justify-between items-center">
      <Link to="/" className="flex items-center">
        <Logo />
      </Link>
      
      <div className="hidden md:flex max-w-md w-full mx-4">
        <form onSubmit={handleSearch} className="relative w-full">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search projects..."
              className="w-full pl-9 pr-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
      </div>
      
      <nav className="flex items-center gap-2">
        <Link to="/dashboard">
          <Button variant="ghost" size="sm" className="hidden md:flex">
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Dashboard
          </Button>
        </Link>
        <Link to="/ai-graphing">
          <Button variant="ghost" size="sm" className="hidden md:flex">
            <Sparkles className="h-4 w-4 mr-2" />
            AI Graphing
          </Button>
        </Link>
        <Button variant="ghost" size="sm" className="hidden md:flex">
          <ChartBar className="h-4 w-4 mr-2" />
          Graphing
        </Button>
        <Button variant="ghost" size="sm" className="hidden md:flex">
          <Users className="h-4 w-4 mr-2" />
          Collaboration
        </Button>
        <div className="flex items-center ml-2">
          <Button variant="outline" size="sm" onClick={() => signOut()}>
            Logout
          </Button>
        </div>
      </nav>
    </header>
  );
};

// Create central panel tabs
const DashboardContent = () => {
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
  
  // Format data for charts
  const formatChartData = (data: UsageData[]) => {
    return data.map(item => ({
      name: item.date.split('-')[2], // Just the day
      value: item.value,
    }));
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
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{projects.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {projects.length > 0 ? "+1 since last month" : "Create your first project"}
                  </p>
                  <div className="h-[80px] mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={formatChartData(usageData.slice(-7))}>
                        <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Active Collaborators</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Math.min(projects.length * 2, 8)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {projects.length > 0 ? "+3 since last month" : "Add collaborators to your projects"}
                  </p>
                  <div className="h-[80px] mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={formatChartData(usageData.slice(-7))}>
                        <Line type="monotone" dataKey="value" stroke="#82ca9d" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Usage Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Math.floor(usageData.reduce((acc, curr) => acc + curr.value, 0) / 3600)} hrs
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {projects.length > 0 ? "+5.2 hrs since last month" : "Start using the platform"}
                  </p>
                  <div className="h-[80px] mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={formatChartData(usageData.slice(-7))}>
                        <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Overview</CardTitle>
                  <CardDescription>Your application performance over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={formatChartData(usageData)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="projects" className="mt-6">
            <ProjectsSection 
              projects={projects}
              onRefresh={fetchProjects}
            />
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Usage Patterns</CardTitle>
                  <CardDescription>How you're using the application</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={formatChartData(usageData)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Your application performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={formatChartData(usageData)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Profile Information</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Name</label>
                      <Input id="name" placeholder="Your name" defaultValue="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email</label>
                      <Input id="email" type="email" placeholder="Your email" defaultValue="john@example.com" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Notification Preferences</h3>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="email-notifications" className="rounded" defaultChecked />
                    <label htmlFor="email-notifications" className="text-sm">Email notifications</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="push-notifications" className="rounded" defaultChecked />
                    <label htmlFor="push-notifications" className="text-sm">Push notifications</label>
                  </div>
                </div>
                
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    renderCanvas();
    
    // Redirect to login if not authenticated
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  // If still loading or user is null, don't render dashboard content
  if (loading || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardHeader />
      
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar />
        <DashboardContent />
      </div>

      <Footer />
      
      <canvas
        className="bg-skin-base pointer-events-none absolute inset-0 mx-auto"
        id="canvas"
      ></canvas>
    </div>
  );
};

export default Dashboard;
