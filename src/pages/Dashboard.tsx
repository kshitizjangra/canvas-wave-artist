
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent, SidebarFooter } from "@/components/ui/sidebar";
import { SidebarDashboard } from "@/components/SidebarDashboard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { renderCanvas } from "@/components/ui/canvas";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardContent } from "@/components/DashboardContent";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect to auth page if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
    renderCanvas();
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex w-full">
      <SidebarDashboard />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <DashboardContent />
      </div>
      
      <canvas
        className="bg-skin-base pointer-events-none absolute inset-0 mx-auto"
        id="canvas"
      ></canvas>
    </div>
  );
};

export default Dashboard;
