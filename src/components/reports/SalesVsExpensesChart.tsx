interface SalesVsExpensesChartProps {
  range: string;
}

export default function SalesVsExpensesChart({ range }: SalesVsExpensesChartProps) {
  // Demo data: points represent daily values for the selected range
  const data = {
    today: [
      { label: 'Sales', value: 12500, color: '#F4C430' },
      { label: 'Expenses', value: 3200, color: '#EF4444' },
    ],
    week: [
      { day: 'Mon', sales: 8000, expenses: 2000 },
      { day: 'Tue', sales: 9500, expenses: 2200 },
      { day: 'Wed', sales: 10200, expenses: 2100 },
      { day: 'Thu', sales: 12000, expenses: 2500 },
      { day: 'Fri', sales: 14800, expenses: 3000 },
      { day: 'Sat', sales: 16500, expenses: 3500 },
      { day: 'Sun', sales: 0, expenses: 0 },
    ],
    month: Array.from({ length: 30 }, (_, i) => ({
      day: `${i + 1}`,
      sales: Math.floor(Math.random() * 20000) + 10000,
      expenses: Math.floor(Math.random() * 5000) + 2000,
    })),
    custom: Array.from({ length: 30 }, (_, i) => ({
      day: `${i + 1}`,
      sales: Math.floor(Math.random() * 20000) + 10000,
      expenses: Math.floor(Math.random() * 5000) + 2000,
    })),
  };

  const selected = data[range as keyof typeof data] || data.month;
  const isSimple = Array.isArray(selected) && selected[0]?.label;

  if (isSimple) {
    // Today view: simple bar comparison
    const items = selected as any[];
    const maxValue = Math.max(...items.map((d) => d.value));

    return (
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.label}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground">{item.label}</span>
              <span className="text-sm font-semibold text-foreground">Ksh {item.value.toLocaleString()}</span>
            </div>
            <div className="h-8 bg-muted rounded-sm overflow-hidden">
              <div
                className="h-full rounded-sm"
                style={{
                  backgroundColor: item.color,
                  width: `${(item.value / maxValue) * 100}%`,
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Week/Month view: line chart visualization
  const items = selected as any[];
  const maxSales = Math.max(...items.filter((d) => d.sales).map((d) => d.sales));
  const maxExpenses = Math.max(...items.filter((d) => d.expenses).map((d) => d.expenses));
  const max = Math.max(maxSales, maxExpenses);

  const chartHeight = 150;
  const chartWidth = Math.max(items.length * 12, 200);

  return (
    <div className="overflow-x-auto">
      <svg width={chartWidth} height={chartHeight} className="text-muted-foreground">
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
          <line
            key={i}
            x1="30"
            y1={chartHeight - chartHeight * ratio}
            x2={chartWidth}
            y2={chartHeight - chartHeight * ratio}
            stroke="currentColor"
            strokeDasharray="4"
            opacity="0.2"
          />
        ))}

        {/* Sales line (golden) */}
        <polyline
          points={items
            .map((d, i) => {
              const x = 30 + i * 12;
              const y = chartHeight - (d.sales / max) * (chartHeight - 10);
              return `${x},${y}`;
            })
            .join(' ')}
          fill="none"
          stroke="#F4C430"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Expenses line (red) */}
        <polyline
          points={items
            .map((d, i) => {
              const x = 30 + i * 12;
              const y = chartHeight - (d.expenses / max) * (chartHeight - 10);
              return `${x},${y}`;
            })
            .join(' ')}
          fill="none"
          stroke="#EF4444"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Axis */}
        <line x1="30" y1="10" x2="30" y2={chartHeight} stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <line x1="30" y1={chartHeight} x2={chartWidth} y2={chartHeight} stroke="currentColor" strokeWidth="1" opacity="0.3" />
      </svg>

      {/* Legend */}
      <div className="flex gap-4 mt-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-gradient-gold" />
          <span className="text-muted-foreground">Sales</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-destructive" />
          <span className="text-muted-foreground">Expenses</span>
        </div>
      </div>
    </div>
  );
}
