import { useState } from "react";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import SignupModal from "@/components/landing/SignupModal";
import Footer from "@/components/landing/Footer";

const Index = () => {
  const [signupOpen, setSignupOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <HeroSection onOpenSignup={() => setSignupOpen(true)} />
      <FeaturesSection />
      <Footer />
      <SignupModal open={signupOpen} onOpenChange={setSignupOpen} />
    </div>
  );
};

export default Index;
