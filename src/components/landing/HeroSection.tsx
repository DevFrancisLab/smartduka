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
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card" />
      
      {/* Subtle golden glow accent */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          {/* Left content */}
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
            {/* Logo/Brand */}
            <div className="mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
                <span className="text-foreground">Smart</span>
                <span className="text-gradient-gold">Duka</span>
              </h1>
            </div>
            
            {/* Tagline */}
            <p 
              className="text-2xl sm:text-3xl lg:text-4xl font-medium text-foreground mb-4 animate-fade-in"
              style={{ animationDelay: '0.2s' }}
            >
              Shop tracking made easy
            </p>
            
            {/* Value proposition */}
            <p 
              className="text-lg sm:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-8 animate-fade-in"
              style={{ animationDelay: '0.3s' }}
            >
              Track your sales, expenses, and profits in Kenyan Shillings. 
              Built for shopkeepers who want to grow their business.
            </p>
            
            {/* CTAs */}
            <div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in"
              style={{ animationDelay: '0.4s' }}
            >
              <Button 
                onClick={onOpenSignup}
                size="lg"
                className="gradient-gold text-primary-foreground hover:opacity-90 transition-all duration-300 text-lg px-8 py-6 rounded-xl font-semibold shadow-lg hover:shadow-xl animate-pulse-glow"
              >
                Start Using SmartDuka
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Button 
                onClick={scrollToFeatures}
                variant="ghost" 
                size="lg"
                className="text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 text-lg px-8 py-6 rounded-xl"
              >
                <Play className="mr-2 w-5 h-5" />
                See How It Works
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div 
              className="mt-12 flex items-center gap-6 justify-center lg:justify-start animate-fade-in"
              style={{ animationDelay: '0.5s' }}
            >
              <div className="flex -space-x-3">
                {['JM', 'AK', 'WN', 'PM'].map((initials, i) => (
                  <div 
                    key={i}
                    className="w-10 h-10 rounded-full bg-card border-2 border-background flex items-center justify-center text-xs font-medium text-muted-foreground"
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground text-sm">
                <span className="text-foreground font-semibold">500+</span> shopkeepers trust SmartDuka
              </p>
            </div>
          </div>
          
          {/* Right content - Phone mockup */}
          <div 
            className="flex-1 flex justify-center order-1 lg:order-2 animate-slide-up"
            style={{ animationDelay: '0.2s' }}
          >
            <PhoneMockup />
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden lg:block">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-muted-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;