
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [accessKey, setAccessKey] = useState("");
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Thanks for showing interest!",
      description: "You will soon get access. Check your email for updates.",
    });
    
    setStep(2);
  };
  
  const handleKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessKey.trim()) {
      toast({
        title: "Access Key Required",
        description: "Please enter your access key.",
        variant: "destructive",
      });
      return;
    }
    
    // Here you would normally validate the key against a database
    // For now, we'll just show a success message
    toast({
      title: "Success!",
      description: "Your access key has been verified. Welcome to Zymatric!",
    });
    
    setStep(3);
  };
  
  return (
    <div className="w-full max-w-md rounded-lg border bg-card p-6 shadow-sm">
      {step === 1 && (
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <h3 className="text-lg font-medium">Join the Waitlist</h3>
          <p className="text-sm text-muted-foreground">Enter your email to get early access.</p>
          
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <Button type="submit" className="w-full">Join Waitlist</Button>
        </form>
      )}
      
      {step === 2 && (
        <form onSubmit={handleKeySubmit} className="space-y-4">
          <h3 className="text-lg font-medium">Enter Access Key</h3>
          <p className="text-sm text-muted-foreground">
            If you have received an access key in your email, enter it below.
          </p>
          
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Your access key"
              value={accessKey}
              onChange={(e) => setAccessKey(e.target.value)}
              required
            />
          </div>
          
          <Button type="submit" className="w-full">Verify Key</Button>
        </form>
      )}
      
      {step === 3 && (
        <div className="space-y-4 text-center">
          <h3 className="text-lg font-medium">Welcome to Zymatric!</h3>
          <p className="text-sm text-muted-foreground">
            Your access has been confirmed. Start exploring our platform.
          </p>
          
          <Button className="w-full">Get Started</Button>
        </div>
      )}
    </div>
  );
}
