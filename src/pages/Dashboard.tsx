
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { renderCanvas } from "@/components/ui/canvas";
import { Logo } from "@/components/Logo";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DIcons } from "@/components/DIcons";

// Create Dashboard sidebar component
const DashboardSidebar = () => {
  return (
    <div className="w-64 border-r h-full bg-background/80 backdrop-blur-sm p-4 flex flex-col gap-4">
      <div className="p-4 rounded-lg border shadow-sm">
        <h3 className="text-sm font-medium mb-2">View Mode</h3>
        <Tabs defaultValue="2d" className="w-full">
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
        <Button variant="outline" size="sm" className="w-full mt-2">
          Enable AI
        </Button>
      </div>
      
      <div className="p-4 rounded-lg border shadow-sm mt-auto">
        <h3 className="text-sm font-medium mb-2">Voice Control</h3>
        <Button variant="outline" size="sm" className="w-full">
          <DIcons.Plus className="mr-2 h-4 w-4" />
          Activate Voice
        </Button>
      </div>
    </div>
  );
};

// Create Dashboard header component
const DashboardHeader = () => {
  return (
    <header className="z-10 p-4 bg-background/80 backdrop-blur-sm border-b flex justify-between items-center">
      <Link to="/">
        <Logo />
      </Link>
      <nav className="flex items-center gap-2">
        <Link to="/">
          <Button variant="ghost" size="sm">Home</Button>
        </Link>
        <Button variant="ghost" size="sm">Graphing</Button>
        <Button variant="ghost" size="sm">Collaboration</Button>
        <Button variant="ghost" size="sm">Exam Mode</Button>
        <Button variant="ghost" size="sm">Profile</Button>
      </nav>
    </header>
  );
};

// Create Dashboard central panel component
const DashboardCentralPanel = () => {
  return (
    <div className="flex-1 p-6">
      <div className="bg-background/80 backdrop-blur-sm p-6 rounded-lg border shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Projects</h2>
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs text-white">KJ</div>
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs text-white">AB</div>
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-xs text-white">CD</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-medium">Project {item}</h3>
              <p className="text-sm text-muted-foreground">Last edited 2 days ago</p>
            </div>
          ))}
        </div>
        
        <div className="mt-6 border rounded-lg p-4">
          <h3 className="font-medium mb-2">Chat Interface</h3>
          <div className="border-t pt-4 mt-2">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Expand Chat</Button>
              <Button variant="outline" size="sm">Collapse Chat</Button>
            </div>
          </div>
        </div>
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
        <DashboardCentralPanel />
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
