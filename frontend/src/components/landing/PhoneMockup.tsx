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
        <div className="bg-background rounded-[2.5rem] overflow-hidden w-[260px] sm:w-[280px] h-[520px] sm:h-[560px]">
          {/* Status bar */}
          <div className="flex justify-between items-center px-4 py-2 text-xs text-muted-foreground">
            <span>9:41</span>
            <div className="flex gap-1">
              <div className="w-3 h-1.5 bg-muted-foreground rounded-sm" />
              <div className="w-3 h-1.5 bg-muted-foreground rounded-sm" />
              <div className="w-5 h-2 bg-primary rounded-sm" />
            </div>
          </div>
          
          {/* App header */}
          <div className="px-4 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-xs">Good morning,</p>
                <h3 className="text-foreground font-semibold text-sm">Jane's Duka</h3>
              </div>
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-bold text-xs">JD</span>
              </div>
            </div>
          </div>
          
          {/* Main stats card */}
          <div className="mx-3 p-3 bg-card rounded-xl border border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground text-xs">Today's Overview</span>
              <span className="text-xs text-primary font-medium">Jan 29</span>
            </div>
            
            {/* Sales - Large display */}
            <div className="mb-3">
              <p className="text-muted-foreground text-xs mb-1">Total Sales</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-foreground">Ksh 3,450</span>
                <span className="text-xs text-success flex items-center">
                  <ArrowUpRight className="w-2.5 h-2.5" />
                  12%
                </span>
              </div>
            </div>
            
            {/* Mini chart visualization */}
            <div className="flex items-end gap-0.5 h-10 mb-3">
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
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-background/50 rounded-lg p-2">
                <p className="text-muted-foreground text-xs mb-0.5">Profit</p>
                <p className="text-success font-bold text-sm">Ksh 1,200</p>
              </div>
              <div className="bg-background/50 rounded-lg p-2">
                <p className="text-muted-foreground text-xs mb-0.5">Expenses</p>
                <p className="text-foreground font-bold text-sm flex items-center gap-0.5">
                  Ksh 980
                  <ArrowDownRight className="w-2.5 h-2.5 text-destructive" />
                </p>
              </div>
            </div>
          </div>
          
          {/* Cash float card */}
          <div className="mx-3 mt-2 p-3 bg-primary/10 rounded-xl border border-primary/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary/70 text-xs mb-0.5">Cash Float</p>
                <p className="text-primary font-bold text-sm">Ksh 5,670</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
            </div>
          </div>
          
          {/* Quick actions */}
          <div className="mx-3 mt-2 flex gap-2">
            <button className="flex-1 gradient-gold text-primary-foreground py-2 rounded-lg font-semibold text-xs">
              + New Sale
            </button>
            <button className="flex-1 bg-card border border-border text-foreground py-2 rounded-lg font-semibold text-xs">
              + Expense
            </button>
          </div>
          
          {/* Bottom nav placeholder */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-28 h-0.5 bg-muted-foreground/30 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default PhoneMockup;