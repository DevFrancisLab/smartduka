import { CreditCard, Repeat } from 'lucide-react';

const ExpensesInsights = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
      {/* Total Expenses Today */}
      <div className="bg-card border border-border rounded-lg p-3 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">Total Expenses Today</p>
            <p className="mt-2 text-2xl sm:text-3xl font-semibold text-destructive">Ksh 3,200</p>
            <p className="mt-1 text-xs text-muted-foreground/70">↓ 5% vs yesterday</p>
          </div>
          <div className="ml-4 rounded-md p-2 bg-destructive/10">
            <CreditCard className="w-5 h-5 text-destructive" />
          </div>
        </div>
      </div>

      {/* Recurring Costs */}
      <div className="bg-card border border-border rounded-lg p-3 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">Total Recurring Costs</p>
            <p className="mt-2 text-2xl sm:text-3xl font-semibold text-foreground">Ksh 1,450</p>
            <p className="mt-1 text-xs text-muted-foreground/70">Transport & Delivery</p>
          </div>
          <div className="ml-4 rounded-md p-2 bg-muted-foreground/10">
            <Repeat className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpensesInsights;
