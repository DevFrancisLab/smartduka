import { TrendingUp } from 'lucide-react';

const SalesInsights = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
      {/* Total Sales Today */}
      <div className="bg-card border border-border rounded-lg p-3 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">Total Sales Today</p>
            <p className="mt-2 text-2xl sm:text-3xl font-semibold text-gradient-gold">
              Ksh 12,450
            </p>
            <p className="mt-1 text-xs text-muted-foreground/70">↑ 18% vs yesterday</p>
          </div>
          <div className="ml-4 rounded-md p-2 bg-gradient-gold/10">
            <TrendingUp className="w-5 h-5 text-gradient-gold" />
          </div>
        </div>
      </div>

      {/* Total Items Sold */}
      <div className="bg-card border border-border rounded-lg p-3 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">Total Items Sold</p>
            <p className="mt-2 text-2xl sm:text-3xl font-semibold text-foreground">
              47 items
            </p>
            <p className="mt-1 text-xs text-muted-foreground/70">From 23 transactions</p>
          </div>
          <div className="ml-4 rounded-md p-2 bg-success/10">
            <TrendingUp className="w-5 h-5 text-success" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesInsights;
