import { Box, AlertCircle } from 'lucide-react';

const StockInsights = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
      <div className="bg-card border border-border rounded-lg p-3 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">Total Inventory Value</p>
            <p className="mt-2 text-2xl sm:text-3xl font-semibold text-gradient-gold">Ksh 48,600</p>
            <p className="mt-1 text-xs text-muted-foreground/70">Current value of stock on hand</p>
          </div>
          <div className="ml-4 rounded-md p-2 bg-gradient-gold/10">
            <Box className="w-5 h-5 text-gradient-gold" />
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-3 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">Low Stock Alerts</p>
            <p className="mt-2 text-2xl sm:text-3xl font-semibold text-destructive">3 items</p>
            <p className="mt-1 text-xs text-muted-foreground/70">Items nearing depletion</p>
          </div>
          <div className="ml-4 rounded-md p-2 bg-destructive/10">
            <AlertCircle className="w-5 h-5 text-destructive" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockInsights;
