import { Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center gap-4">
          {/* Logo */}
          <div>
            <span className="text-xl font-bold">
              <span className="text-foreground">Smart</span>
              <span className="text-gradient-gold">Duka</span>
            </span>
          </div>
          
          {/* Made in Kenya */}
          <p className="text-muted-foreground text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-destructive fill-destructive" /> in Kenya
          </p>
          
          {/* Copyright */}
          <p className="text-muted-foreground text-xs">
            © {currentYear} SmartDuka. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;