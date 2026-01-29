import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, Mail, Shield, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface SignupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SignupModal = ({ open, onOpenChange }: SignupModalProps) => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phone && !email) {
      toast({
        title: "Please enter your details",
        description: "Enter either your phone number or email to get started.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    onOpenChange(false);
    
    toast({
      title: "Welcome to SmartDuka! 🎉",
      description: "Check your phone or email for next steps.",
    });
    
    // Reset form
    setPhone("");
    setEmail("");

    // Navigate to dashboard (dummy signup flow)
    navigate('/dashboard');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader className="text-center sm:text-left">
          {/* Logo */}
          <div className="mb-2 flex items-center gap-2">
            <img src="/smartduka_logo.png" alt="SmartDuka" className="h-8 w-8" />
            <span className="text-2xl font-bold">
              <span className="text-foreground">Smart</span>
              <span className="text-gradient-gold">Duka</span>
            </span>
          </div>
          
          <DialogTitle className="text-2xl font-bold text-foreground">
            Login
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Join thousands of shopkeepers tracking their business with SmartDuka.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          {/* Phone input */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-foreground flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" />
              Phone Number
            </Label>
            <div className="flex">
              <div className="flex items-center px-3 bg-muted border border-r-0 border-input rounded-l-md text-muted-foreground text-sm">
                +254
              </div>
              <Input
                id="phone"
                type="tel"
                placeholder="712 345 678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="rounded-l-none bg-background border-input text-foreground placeholder:text-muted-foreground focus:ring-primary"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-card text-muted-foreground">or use email</span>
            </div>
          </div>

          {/* Email input */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="jane@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background border-input text-foreground placeholder:text-muted-foreground focus:ring-primary"
            />
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full gradient-gold text-primary-foreground hover:opacity-90 transition-all duration-300 py-6 text-lg font-semibold rounded-xl"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Getting started...
              </span>
            ) : (
              "Get Started — It's Free"
            )}
          </Button>

          {/* Privacy note */}
          <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1">
            <Shield className="w-3 h-3" />
            We respect your privacy. No spam, ever.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SignupModal;