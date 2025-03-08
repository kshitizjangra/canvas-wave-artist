
import { renderCanvas } from "@/components/ui/canvas";
import { useEffect } from "react";
import { Logo } from "@/components/Logo";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";

const Contact = () => {
  const { user } = useAuth();
  
  useEffect(() => {
    renderCanvas();
  }, []);

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
          {user ? (
            <Link to="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
          ) : (
            <Link to="/auth">
              <Button variant="ghost">Login</Button>
            </Link>
          )}
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center z-10 px-4 py-10">
        <div className="max-w-2xl w-full bg-background/80 backdrop-blur-sm p-8 rounded-lg border shadow-lg">
          <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
          
          <div className="text-center mb-8">
            <p className="text-lg mb-4">
              Have questions about Zymatric? We'd love to hear from you.
            </p>
            <p className="text-xl font-medium">
              You can reach us at:{" "}
              <a href="mailto:kshitiz@zymatric.com" className="text-ali hover:underline">
                kshitiz@zymatric.com
              </a>
            </p>
          </div>
          
          <div className="bg-muted/50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Get Early Access</h2>
            <p className="mb-4">
              Interested in trying Zymatric before its public release? Join our waitlist on the homepage to receive updates and be among the first to experience our innovative math visualization platform.
            </p>
            <div className="text-center mt-6">
              <Link to="/">
                <Button>
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
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

export default Contact;
