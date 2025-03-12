
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LayoutDashboard, ChartBar, Users, Search, Sparkles } from "lucide-react";

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
