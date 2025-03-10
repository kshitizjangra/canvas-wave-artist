
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { SubscriptionPlans } from "@/components/SubscriptionPlans";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Hero />
      <SubscriptionPlans />
      <Footer />
    </div>
  );
};

export default Index;
