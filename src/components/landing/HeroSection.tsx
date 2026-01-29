import { ArrowRight, Play } from "lucide-react";
import PhoneMockup from "./PhoneMockup";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onOpenSignup: () => void;
}

const HeroSection = ({ onOpenSignup }: HeroSectionProps) => {
  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen relative overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/kenyan_shopkeeper.jpeg)' }}
      />
      
      {/* Color overlay on top of image */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card opacity-70" />
      
      {/* Subtle golden glow accent */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-center">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 w-full">
          {/* Left content */}
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
            {/* Logo/Brand */}
            <div className="mb-3 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-foreground">Smart</span>
                <span className="text-gradient-gold">Duka</span>
              </h1>
            </div>
            
            {/* Tagline */}
            <p 
              className="text-lg sm:text-xl lg:text-2xl font-medium text-foreground mb-2 animate-fade-in"
              style={{ animationDelay: '0.2s' }}
            >
              Shop tracking made easy
            </p>
            
            {/* Value proposition */}
            <p 
              className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto lg:mx-0 mb-5 animate-fade-in leading-relaxed"
              style={{ animationDelay: '0.3s' }}
            >
              Track your sales, expenses, and profits in Kenyan Shillings. 
              Built for shopkeepers who want to grow their business.
            </p>
            
            {/* CTAs */}
            <div 
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start animate-fade-in mb-5"
              style={{ animationDelay: '0.4s' }}
            >
              <Button 
                onClick={onOpenSignup}
                className="gradient-gold text-primary-foreground hover:opacity-90 transition-all duration-300 text-base px-8 py-6 rounded-lg font-semibold shadow-md hover:shadow-lg animate-pulse-glow w-full sm:w-auto"
              >
                Start Using SmartDuka
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
            </div>
            
            {/* Trust indicators */}
            <div 
              className="flex items-center gap-3 justify-center lg:justify-start animate-fade-in text-xs"
              style={{ animationDelay: '0.5s' }}
            >
            </div>
          </div>
          
          {/* Right content - Phone mockup */}
          <div 
            className="flex-1 flex justify-center items-center order-1 lg:order-2 animate-slide-up"
            style={{ animationDelay: '0.2s' }}
          >
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;