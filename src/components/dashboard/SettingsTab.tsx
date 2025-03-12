
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const SettingsTab = () => {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [profileForm, setProfileForm] = useState({
    fullName: user?.user_metadata?.full_name || "",
    email: user?.email || "",
  });
  const [isUpdating, setIsUpdating] = useState(false);

  const handleProfileUpdate = async () => {
    setIsUpdating(true);
    const { error } = await updateProfile({
      email: profileForm.email !== user?.email ? profileForm.email : undefined,
      data: {
        full_name: profileForm.fullName
      }
    });

    if (error) {
      toast({
        title: "Error updating profile",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
    }
    setIsUpdating(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>Manage your account preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">Full Name</label>
            <Input
              id="name"
              value={profileForm.fullName}
              onChange={(e) => setProfileForm(prev => ({ ...prev, fullName: e.target.value }))}
              placeholder="Your name"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <Input
              id="email"
              type="email"
              value={profileForm.email}
              onChange={(e) => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
              placeholder="Your email"
            />
          </div>
        </div>
        
        <Button 
          onClick={handleProfileUpdate}
          disabled={isUpdating}
        >
          {isUpdating ? "Saving Changes..." : "Save Changes"}
        </Button>
      </CardContent>
    </Card>
  );
};
