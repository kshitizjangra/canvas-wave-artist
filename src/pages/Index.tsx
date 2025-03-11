
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { SubscriptionPlans } from "@/components/SubscriptionPlans";
import { GlobalCursor } from "@/components/GlobalCursor";

const Index = () => {
  return (
    <GlobalCursor>
      <div className="min-h-screen bg-background flex flex-col">
        <Hero />
        <SubscriptionPlans />
        <Footer />
      </div>
    </GlobalCursor>
  );
};

export default Index;
