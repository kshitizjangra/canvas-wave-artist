
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { SubscriptionPlans } from "@/components/SubscriptionPlans";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Hero />
      <SubscriptionPlans />
      <Footer />
      <Toaster />
    </div>
  );
};

export default Index;
