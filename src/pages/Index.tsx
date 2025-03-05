
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { ChatbotToggle } from "@/components/ChatbotToggle";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Hero />
      <Footer />
      <ChatbotToggle />
    </div>
  );
};

export default Index;
