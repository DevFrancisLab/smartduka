import { 
  ShoppingCart, 
  Receipt, 
  Calculator, 
  Wallet, 
  BarChart3, 
  WifiOff 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: ShoppingCart,
    title: "Sales Tracking",
    description: "Log every sale instantly with a single tap. Know exactly how much you've sold each day.",
  },
  {
    icon: Receipt,
    title: "Expense Management",
    description: "Track stock purchases, rent, and all business costs. See where your money goes.",
  },
  {
    icon: Calculator,
    title: "Profit Calculator",
    description: "See your real profit in Ksh daily. No more guessing if your business is making money.",
  },
  {
    icon: Wallet,
    title: "Cash Float Monitor",
    description: "Always know your cash at hand. Never be caught off guard with your float.",
  },
  {
    icon: BarChart3,
    title: "Daily Reports",
    description: "Simple summaries at a glance. Understand your business with easy-to-read reports.",
  },
  {
    icon: WifiOff,
    title: "Works Offline",
    description: "Track sales even without internet. Your data syncs automatically when you're back online.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 lg:py-32 bg-card relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--muted-foreground)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Everything you need to{" "}
            <span className="text-gradient-gold">grow your duka</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Simple, powerful tools designed for busy shopkeepers. 
            No complicated spreadsheets, just clear numbers.
          </p>
        </div>
        
        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="group bg-background/50 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 cursor-pointer"
              style={{ 
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <CardContent className="p-6 lg:p-8">
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                
                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;