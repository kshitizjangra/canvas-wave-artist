
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { 
  Home, 
  Settings, 
  FileText, 
  Users, 
  BarChart3, 
  Calendar, 
  MessagesSquare, 
  LogOut 
} from "lucide-react";

export function SidebarDashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const fullName = user?.user_metadata?.full_name || "";
  
  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  const menuItems = [
    { title: "Dashboard", icon: Home, url: "/dashboard" },
    { title: "Analytics", icon: BarChart3, url: "#" },
    { title: "Documents", icon: FileText, url: "#" },
    { title: "Calendar", icon: Calendar, url: "#" },
    { title: "Messages", icon: MessagesSquare, url: "#" },
    { title: "Team", icon: Users, url: "#" },
    { title: "Settings", icon: Settings, url: "#" },
  ];

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="flex justify-center py-6">
        <Logo />
      </SidebarHeader>
      
      <SidebarContent className="px-4">
        <div className="mb-6 flex flex-col items-center py-4">
          <Avatar className="h-20 w-20 mb-2">
            <AvatarImage src={user?.user_metadata?.avatar_url} />
            <AvatarFallback className="text-lg font-semibold bg-primary text-primary-foreground">
              {getInitials(fullName)}
            </AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h3 className="text-lg font-medium">{fullName}</h3>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <Button 
          variant="outline" 
          className="w-full justify-start" 
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
