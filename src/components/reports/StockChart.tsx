interface StockChartProps {
  range: string;
}

export default function StockChart({ range }: StockChartProps) {
  const items = [
    { name: 'Rice (50kg)', quantity: 45, max: 100, color: '#F4C430' },
    { name: 'Maize Flour', quantity: 38, max: 80, color: '#F4C430' },
    { name: 'Sugar', quantity: 25, max: 60, color: '#F4C430' },
    { name: 'Cooking Oil', quantity: 12, max: 50, color: '#EF4444' }, // Low stock
    { name: 'Beans', quantity: 55, max: 100, color: '#22C55E' },
  ];

  const maxQuantity = Math.max(...items.map((item) => item.max));

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const percentage = (item.quantity / item.max) * 100;
        const isLowStock = percentage < 30;

        return (
          <div key={item.name}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm font-medium ${isLowStock ? 'text-destructive' : 'text-foreground'}`}>
                {item.name}
              </span>
              <span className={`text-xs font-semibold ${isLowStock ? 'text-destructive' : 'text-muted-foreground'}`}>
                {item.quantity} / {item.max}
              </span>
            </div>
            <div className="h-6 bg-muted rounded-md overflow-hidden">
              <div
                className={`h-full rounded-md ${isLowStock ? 'bg-destructive' : 'bg-gradient-gold'}`}
                style={{
                  width: `${percentage}%`,
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
          </div>
        );
      })}

      {/* Summary stats */}
      <div className="mt-6 pt-4 border-t border-border grid grid-cols-2 gap-4">
        <div className="bg-muted rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-1">Total Stock Items</p>
          <p className="text-lg font-bold text-foreground">{items.length}</p>
        </div>
        <div className="bg-muted rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-1">Low Stock Alerts</p>
          <p className="text-lg font-bold text-destructive">{items.filter((i) => (i.quantity / i.max) * 100 < 30).length}</p>
        </div>
      </div>
    </div>
  );
}
