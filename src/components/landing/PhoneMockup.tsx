import { TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";

const PhoneMockup = () => {
  return (
    <div className="relative">
      {/* Glow effect behind phone */}
      <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-75" />
      
      {/* Phone frame */}
      <div className="relative bg-card rounded-[3rem] p-2 shadow-2xl border border-border animate-float">
        {/* Phone notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-background rounded-full z-10" />
        
        {/* Phone screen */}
        <div className="bg-background rounded-[2.5rem] overflow-hidden w-[280px] sm:w-[300px] h-[580px] sm:h-[620px]">
          {/* Status bar */}
          <div className="flex justify-between items-center px-6 py-3 text-xs text-muted-foreground">
            <span>9:41</span>
            <div className="flex gap-1">
              <div className="w-4 h-2 bg-muted-foreground rounded-sm" />
              <div className="w-4 h-2 bg-muted-foreground rounded-sm" />
              <div className="w-6 h-3 bg-primary rounded-sm" />
            </div>
          </div>
          
          {/* App header */}
          <div className="px-5 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Good morning,</p>
                <h3 className="text-foreground font-semibold text-lg">Jane's Duka</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-bold">JD</span>
              </div>
            </div>
          </div>
          
          {/* Main stats card */}
          <div className="mx-4 p-5 bg-card rounded-2xl border border-border">
            <div className="flex items-center justify-between mb-4">
              <span className="text-muted-foreground text-sm">Today's Overview</span>
              <span className="text-xs text-primary font-medium">Jan 29</span>
            </div>
            
            {/* Sales - Large display */}
            <div className="mb-4">
              <p className="text-muted-foreground text-xs mb-1">Total Sales</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-foreground">Ksh 3,450</span>
                <span className="text-xs text-success flex items-center">
                  <ArrowUpRight className="w-3 h-3" />
                  12%
                </span>
              </div>
            </div>
            
            {/* Mini chart visualization */}
            <div className="flex items-end gap-1 h-12 mb-4">
              {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm transition-all duration-300"
                  style={{
                    height: `${height}%`,
                    background: i === 6 
                      ? 'linear-gradient(180deg, hsl(47 90% 57%), hsl(45 100% 70%))' 
                      : 'hsl(217 33% 25%)',
                  }}
                />
              ))}
            </div>
            
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-background/50 rounded-xl p-3">
                <p className="text-muted-foreground text-xs mb-1">Profit</p>
                <p className="text-success font-bold text-lg">Ksh 1,200</p>
              </div>
              <div className="bg-background/50 rounded-xl p-3">
                <p className="text-muted-foreground text-xs mb-1">Expenses</p>
                <p className="text-foreground font-bold text-lg flex items-center gap-1">
                  Ksh 980
                  <ArrowDownRight className="w-3 h-3 text-destructive" />
                </p>
              </div>
            </div>
          </div>
          
          {/* Cash float card */}
          <div className="mx-4 mt-4 p-4 bg-primary/10 rounded-2xl border border-primary/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary/70 text-xs mb-1">Cash Float</p>
                <p className="text-primary font-bold text-xl">Ksh 5,670</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>
          
          {/* Quick actions */}
          <div className="mx-4 mt-4 flex gap-3">
            <button className="flex-1 gradient-gold text-primary-foreground py-3 rounded-xl font-semibold text-sm">
              + New Sale
            </button>
            <button className="flex-1 bg-card border border-border text-foreground py-3 rounded-xl font-semibold text-sm">
              + Expense
            </button>
          </div>
          
          {/* Bottom nav placeholder */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-32 h-1 bg-muted-foreground/30 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default PhoneMockup;