import React from "react";
import { TrendingUp, ArrowDown, DollarSign, Box } from "lucide-react";

interface KpiCardsProps {
  sales?: string;
  expenses?: string;
  cashFloat?: string;
  stockHealthy?: boolean;
}

export default function KpiCards({
  sales = "Ksh 3,450",
  expenses = "Ksh 1,200",
  cashFloat = "Ksh 2,000",
  stockHealthy = true,
}: KpiCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {/* Today's Sales */}
      <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">Today's Sales</p>
            <p className="mt-2 text-2xl sm:text-3xl font-semibold text-foreground">{sales}</p>
            <p className="mt-1 text-xs text-muted-foreground/70">↑ vs yesterday</p>
          </div>
          <div className="ml-4 rounded-md p-2 bg-gradient-gold/10">
            <TrendingUp className="w-5 h-5 text-gradient-gold" />
          </div>
        </div>
      </div>

      {/* Today's Expenses */}
      <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">Today's Expenses</p>
            <p className="mt-2 text-2xl sm:text-3xl font-semibold text-foreground">{expenses}</p>
            <p className="mt-1 text-xs text-muted-foreground/70">Includes transport & lunch</p>
          </div>
          <div className="ml-4 rounded-md p-2 bg-destructive/10">
            <ArrowDown className="w-5 h-5 text-destructive" />
          </div>
        </div>
      </div>

      {/* Cash Float */}
      <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">Cash Float Available</p>
            <p className="mt-2 text-2xl sm:text-3xl font-semibold text-foreground">{cashFloat}</p>
            <p className="mt-1 text-xs text-muted-foreground/70">Enough for change</p>
          </div>
          <div className="ml-4 rounded-md p-2 bg-gradient-gold/10">
            <DollarSign className="w-5 h-5 text-gradient-gold" />
          </div>
        </div>
      </div>

      {/* Stock Status */}
      <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">Stock Status</p>
            <p className="mt-2 text-2xl sm:text-3xl font-semibold text-foreground flex items-center gap-3">
              {stockHealthy ? (
                <span className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-success" />
                  <span>Stock Healthy</span>
                </span>
              ) : (
                <span className="flex items-center gap-2 text-gradient-gold">
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-400" />
                  <span>Low Stock</span>
                </span>
              )}
            </p>
            <p className="mt-1 text-xs text-muted-foreground/70">Next restock in ~2 days</p>
          </div>
          <div className="ml-4 rounded-md p-2 bg-muted-foreground/5">
            <Box className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
}
