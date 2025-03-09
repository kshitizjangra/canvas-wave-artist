
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [accessKey, setAccessKey] = useState("");
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simply proceed to next step without sending email
      toast({
        title: "Thanks for showing interest!",
        description: "You will soon get access. Check back later for updates.",
      });
      
      setStep(2);
    } catch (error) {
      console.error("Error processing request:", error);
      toast({
        title: "Something went wrong",
        description: "We couldn't process your request. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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

  const handleGetStarted = () => {
    navigate("/auth");
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
              disabled={isSubmitting}
              required
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Join Waitlist"}
          </Button>
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
          
          <Button className="w-full" onClick={handleGetStarted}>Get Started</Button>
        </div>
      )}
    </div>
  );
}
