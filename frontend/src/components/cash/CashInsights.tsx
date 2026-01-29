const CashInsights = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="bg-card border border-border rounded-lg p-3 shadow-sm">
        <p className="text-xs text-muted-foreground">Remaining After Today's Transactions</p>
        <p className="mt-2 text-xl font-semibold text-foreground">Ksh 1,750</p>
        <p className="mt-1 text-xs text-muted-foreground/70">Projected after recent changes</p>
      </div>

      <div className="bg-card border border-border rounded-lg p-3 shadow-sm">
        <p className="text-xs text-muted-foreground">Warning Threshold</p>
        <p className="mt-2 text-xl font-semibold text-destructive">Below Ksh 500</p>
        <p className="mt-1 text-xs text-muted-foreground/70">Set alert to avoid shortage</p>
      </div>
    </div>
  );
};

export default CashInsights;
