
"use client";

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { renderCanvas } from "@/components/ui/canvas";
import { DIcons } from "@/components/DIcons";
import { Button } from "@/components/ui/button";
import { Typewriter } from "@/components/Typewriter";
import { WaitlistForm } from "@/components/WaitlistForm";
import { Logo } from "@/components/Logo";

export function Hero() {
  useEffect(() => {
    renderCanvas();
  }, []);

  return (
    <section id="home" className="min-h-screen flex flex-col">
      <header className="z-10 p-4 flex justify-between items-center">
        <Logo />
        <div className="flex items-center gap-4">
          <Link to="/about">
            <Button variant="ghost">About</Button>
          </Link>
          <Link to="/contact">
            <Button variant="ghost">Contact</Button>
          </Link>
        </div>
      </header>

      <div className="animation-delay-8 animate-fadeIn mt-10 flex flex-col items-center justify-center px-4 text-center md:mt-20 flex-grow">
        <div className="z-10 mb-6 mt-10 sm:justify-center md:mb-4 md:mt-10">
          <div className="relative flex items-center whitespace-nowrap rounded-full border bg-popover px-3 py-1 text-xs leading-6 text-primary/60">
            <DIcons.Shapes className="h-5 p-1" /> Introducing Zymatric.
            <Link
              to="/products/dicons"
              className="hover:text-ali ml-1 flex items-center font-semibold"
            >
              <div className="absolute inset-0 flex" aria-hidden="true" />
              Explore{" "}
              <span aria-hidden="true">
                <DIcons.ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>

        <div className="mb-10 mt-4 md:mt-6">
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
                    "Your complete platform for the Design.",
                    "Innovative solutions for tomorrow.",
                    "Transforming ideas into reality.",
                    "The future of technology is here."
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

          <h1 className="mt-8 text-2xl md:text-2xl">
            Welcome to our innovative platform{" "}
            <span className="text-ali font-bold">Zymatric</span>
          </h1>

          <p className="md:text-md mx-auto mb-8 mt-2 max-w-2xl px-6 text-sm text-primary/60 sm:px-6 md:max-w-4xl md:px-20 lg:text-lg">
            We're crafting the next generation of design tools and solutions to empower creators worldwide.
          </p>
          
          <div className="mx-auto max-w-md mb-8">
            <WaitlistForm />
          </div>
          
          <div className="flex justify-center gap-2">
            <Link to="/dashboard">
              <Button variant="default" size="lg">
                Learn More
              </Button>
            </Link>
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
      ></canvas>
    </section>
  );
}
