
"use client";

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { renderCanvas } from "@/components/ui/canvas";
import { DIcons } from "@/components/DIcons";
import { Button } from "@/components/ui/button";
import { Typewriter } from "@/components/Typewriter";
import { WaitlistForm } from "@/components/WaitlistForm";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/contexts/AuthContext";
import { CursorCustomizer } from '@/components/CursorCustomizer';
import { useCursor } from '@/contexts/CursorContext';

export function Hero() {
  const { user } = useAuth();
  const { userName, showCanvas } = useCursor();
  
  useEffect(() => {
    // Initialize the canvas for the hero section only if showCanvas is true
    if (showCanvas) {
      renderCanvas();
    } else {
      const canvas = document.getElementById('canvas');
      if (canvas) {
        canvas.style.display = 'none';
      }
    }
    
    // Cleanup when component unmounts
    return () => {
      const canvas = document.getElementById('canvas');
      if (canvas) {
        canvas.style.display = 'none';
      }
    };
  }, [showCanvas]);

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex flex-col">
      <header className="z-10 p-4 flex justify-between items-center">
        <Logo />
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost">Home</Button>
          </Link>
          <Button variant="ghost" onClick={scrollToPricing}>
            Pricing
          </Button>
          {user ? (
            <Link to="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
          ) : (
            <Link to="/auth">
              <Button variant="ghost">Login</Button>
            </Link>
          )}
          <Link to="/contact">
            <Button variant="ghost">Contact</Button>
          </Link>
        </div>
      </header>

      <div className="animation-delay-8 animate-fadeIn mt-10 flex flex-col items-center justify-center px-4 text-center md:mt-20 flex-grow">
        <div className="z-10 mb-6 mt-10 sm:justify-center md:mb-4 md:mt-10">
          <CursorCustomizer />
        </div>

        <div className="mb-10 mt-4 md:mt-6">
          {userName && (
            <div className="text-sm text-primary/80 mb-4 font-medium">
              Welcome, {userName}!
            </div>
          )}
          <div className="px-2">
            <div className="border-ali relative mx-auto h-full max-w-7xl border p-6 [mask-image:radial-gradient(800rem_96rem_at_center,white,transparent)] md:px-12 md:py-20">
              <h1 className="flex select-none flex-col px-3 py-2 text-center text-5xl font-semibold leading-none tracking-tight md:flex-col md:text-8xl lg:flex-row lg:text-8xl">
                <DIcons.Plus
                  strokeWidth={4}
                  className="text-ali absolute -left-5 -top-5 h-10 w-10"
                />
                <DIcons.Plus
                  strokeWidth={4}
                  className="text-ali absolute -bottom-5 -left-5 h-10 w-10"
                />
                <DIcons.Plus
                  strokeWidth={4}
                  className="text-ali absolute -right-5 -top-5 h-10 w-10"
                />
                <DIcons.Plus
                  strokeWidth={4}
                  className="text-ali absolute -bottom-5 -right-5 h-10 w-10"
                />
                <Typewriter 
                  text={[
                    "Visualize Mathematics Like Never Before",
                    "Make complex concepts intuitive and engaging"
                  ]} 
                  delay={100} 
                  loop={true}
                />
              </h1>
              <div className="flex items-center justify-center gap-1">
                <span className="relative flex h-3 w-3 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                </span>
                <p className="text-xs text-green-500">Coming Soon - 2025</p>
              </div>
            </div>
          </div>
          
          <div className="mx-auto max-w-md mb-8 mt-10">
            <WaitlistForm />
          </div>
          
          <div className="flex justify-center gap-2">
            <a href="https://cal.com/zymatric/demo" target="_blank" rel="noreferrer">
              <Button variant="outline" size="lg">
                Book a Demo
              </Button>
            </a>
          </div>
        </div>
      </div>
      
      <canvas
        className="bg-skin-base pointer-events-none absolute inset-0 mx-auto"
        id="canvas"
        style={{ display: showCanvas ? 'block' : 'none' }}
      ></canvas>
    </section>
  );
}
