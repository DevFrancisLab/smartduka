const CashFloatCard = () => {
  const currentFloat = 2000;

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-xs text-muted-foreground">Current Cash Float</p>
        <p className="mt-2 text-3xl sm:text-4xl font-bold text-gradient-gold">Ksh {currentFloat.toLocaleString()}</p>
        <p className="mt-1 text-xs text-muted-foreground/70">Available for today</p>
      </div>

      <div className="text-right">
        <p className="text-xs text-muted-foreground">Safe reserve</p>
        <p className="mt-2 text-lg font-semibold text-foreground">Ksh 500</p>
      </div>
    </div>
  );
};

export default CashFloatCard;
