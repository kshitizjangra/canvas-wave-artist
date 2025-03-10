
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { SubscriptionPlans } from "@/components/SubscriptionPlans";
import { CursorProvider } from "@/contexts/CursorContext";

const Index = () => {
  return (
    <CursorProvider>
      <div className="min-h-screen bg-background flex flex-col">
        <Hero />
        <SubscriptionPlans />
        <Footer />
      </div>
    </CursorProvider>
  );
};

export default Index;
