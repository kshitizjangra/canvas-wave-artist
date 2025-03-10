import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export function SubscriptionPlans() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Basic features for students and casual users",
      features: [
        "10 AI graphing operations per day",
        "Basic graph types",
        "Export as PNG",
        "Community support"
      ],
      buttonText: "Get Started",
      buttonVariant: "outline" as const,
      popular: false
    },
    {
      name: "Pro",
      price: "$12",
      period: "per month",
      description: "Advanced features for professionals",
      features: [
        "Unlimited AI graphing operations",
        "All graph types and styles",
        "Export in multiple formats",
        "Priority support",
        "Custom branding"
      ],
      buttonText: "Upgrade to Pro",
      buttonVariant: "default" as const
    },
    {
      name: "Enterprise",
      price: "$49",
      period: "per month",
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
      buttonVariant: "outline" as const,
      popular: false
    }
  ];

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
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mt-8">
          {plans.map((plan) => (
            <Card key={plan.name}>
              <CardHeader className="pb-1">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="ml-1 text-muted-foreground">/{plan.period}</span>
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
                <Button className="w-full" variant={plan.buttonVariant}>
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
