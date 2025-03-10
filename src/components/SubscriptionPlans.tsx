
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Define types for plan price data
type PlanPricing = {
  usd: { price: string; period: string };
  inr: { price: string; period: string };
};

type Plan = {
  id: string;
  name: string;
  pricing: PlanPricing;
  description: string;
  features: string[];
  buttonText: string;
  buttonVariant: "outline" | "default";
  popular: boolean;
};

export function SubscriptionPlans() {
  const [currency, setCurrency] = useState<"usd" | "inr">("usd");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  // Detect user's location to set default currency
  useEffect(() => {
    const detectUserLocation = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        if (data.country === "IN") {
          setCurrency("inr");
        }
      } catch (error) {
        console.error("Failed to detect location:", error);
        // Default to USD if location detection fails
      }
    };

    detectUserLocation();
  }, []);

  const plans: Plan[] = [
    {
      id: "free-plan",
      name: "Free",
      pricing: {
        usd: { price: "$0", period: "forever" },
        inr: { price: "₹0", period: "forever" }
      },
      description: "Basic features for students and casual users",
      features: [
        "10 AI graphing operations per day",
        "Basic graph types",
        "Export as PNG",
        "Community support"
      ],
      buttonText: "Get Started",
      buttonVariant: "outline",
      popular: false
    },
    {
      id: "pro-plan",
      name: "Pro",
      pricing: {
        usd: { price: "$12", period: "per month" },
        inr: { price: "₹999", period: "per month" }
      },
      description: "Advanced features for professionals",
      features: [
        "Unlimited AI graphing operations",
        "All graph types and styles",
        "Export in multiple formats",
        "Priority support",
        "Custom branding"
      ],
      buttonText: "Upgrade to Pro",
      buttonVariant: "default",
      popular: true
    },
    {
      id: "enterprise-plan",
      name: "Enterprise",
      pricing: {
        usd: { price: "$79", period: "per month" },
        inr: { price: "₹5,999", period: "per month" }
      },
      description: "Complete solution for teams and businesses",
      features: [
        "Everything in Pro",
        "Team collaboration",
        "Advanced data integration",
        "Custom AI model integration",
        "Dedicated support",
        "Enterprise SLA"
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline",
      popular: false
    }
  ];

  const handleCurrencyChange = () => {
    setCurrency(prev => prev === "usd" ? "inr" : "usd");
  };

  const handleSubscribe = (planId: string) => {
    setIsProcessing(true);
    
    // Simulate API call to Stripe checkout
    setTimeout(() => {
      setIsProcessing(false);
      
      if (planId === "free-plan") {
        // For free plan, just show success
        toast({
          title: "Free Plan Activated",
          description: "You're now using the Free plan!",
          variant: "default",
        });
      } else {
        // For paid plans, simulate successful purchase
        const planName = plans.find(p => p.id === planId)?.name;
        toast({
          title: `${planName} Plan Purchased!`,
          description: "Thank you for your subscription! Your account has been upgraded.",
          variant: "default",
        });
        
        // In a real implementation, you would redirect to Stripe Checkout here
        // window.location.href = checkoutUrl;
      }
    }, 1500);
  };

  return (
    <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Pricing Plans
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Choose the plan that works best for you and your team
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className={currency === "usd" ? "font-bold" : ""}>USD</span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleCurrencyChange}
              className="relative h-6 w-11 px-0"
            >
              <div className={`absolute inset-0 transition-all duration-200 ease-in-out bg-primary rounded-full ${currency === "usd" ? "translate-x-0" : "translate-x-5"}`} style={{width: "45%", height: "80%", top: "10%", left: currency === "usd" ? "5%" : "50%"}}></div>
            </Button>
            <span className={currency === "inr" ? "font-bold" : ""}>INR</span>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mt-8">
          {plans.map((plan) => (
            <Card key={plan.id} className={plan.popular ? "border-primary shadow-lg" : ""}>
              {plan.popular && (
                <div className="absolute -top-3 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Popular
                </div>
              )}
              <CardHeader className="pb-1">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">{plan.pricing[currency].price}</span>
                  <span className="ml-1 text-muted-foreground">/{plan.pricing[currency].period}</span>
                </div>
                <CardDescription className="pt-1.5">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-1">
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant={plan.buttonVariant}
                  disabled={isProcessing}
                  onClick={() => handleSubscribe(plan.id)}
                >
                  {isProcessing ? "Processing..." : plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
