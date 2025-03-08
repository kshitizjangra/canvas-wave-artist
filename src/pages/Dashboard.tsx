
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { renderCanvas } from "@/components/ui/canvas";
import { Logo } from "@/components/Logo";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";

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
      <header className="z-10 p-4 flex justify-between items-center">
        <Link to="/">
          <Logo />
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost">Home</Button>
          </Link>
          <Link to="/contact">
            <Button variant="ghost">Contact</Button>
          </Link>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center z-10 px-4 py-10">
        <div className="max-w-4xl w-full bg-background/80 backdrop-blur-sm p-8 rounded-lg border shadow-lg">
          <h1 className="text-4xl font-bold mb-6">Welcome to your Dashboard</h1>
          <p className="text-lg mb-4">
            This is your personal dashboard where you can manage your Zymatric experience.
          </p>
        </div>
      </main>

      <Footer />
      
      <canvas
        className="bg-skin-base pointer-events-none absolute inset-0 mx-auto"
        id="canvas"
      ></canvas>
    </div>
  );
};

export default Dashboard;
