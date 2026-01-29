interface ProfitChartProps {
  range: string;
}

export default function ProfitChart({ range }: ProfitChartProps) {
  // Generate profit data based on range
  const generateData = () => {
    if (range === 'today') {
      return [
        { label: 'Profit', value: 9300, color: '#22C55E' },
      ];
    }

    const count = range === 'week' ? 7 : 30;
    return Array.from({ length: count }, (_, i) => ({
      day: range === 'week' ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i] : `${i + 1}`,
      profit: Math.floor(Math.random() * 18000) + 7000,
    }));
  };

  const data = generateData();
  const isSimple = Array.isArray(data) && data[0]?.label;

  if (isSimple) {
    // Today view
    const items = data as any[];
    return (
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.label}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-foreground">{item.label}</span>
              <span className="text-lg font-bold text-success">Ksh {item.value.toLocaleString()}</span>
            </div>
            <div className="h-10 bg-success/10 rounded-md flex items-center px-3">
              <div className="text-xs text-success font-medium">
                {Math.round((item.value / 12500) * 100)}% of sales
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Week/Month view: area chart
  const items = data as any[];
  const maxProfit = Math.max(...items.map((d) => d.profit));
  const minProfit = Math.min(...items.map((d) => d.profit));
  const range_val = maxProfit - minProfit;

  const chartHeight = 150;
  const chartWidth = Math.max(items.length * 12, 200);

  // Create area path
  const areaPoints = items
    .map((d, i) => {
      const x = 30 + i * 12;
      const y = chartHeight - ((d.profit - minProfit) / range_val) * (chartHeight - 30);
      return `${x},${y}`;
    })
    .join(' ');

  const bottomPoints = `30,${chartHeight} ${areaPoints.split(' ').slice(-1)[0].split(',')[0]},${chartHeight}`;

  return (
    <div className="overflow-x-auto">
      <svg width={chartWidth} height={chartHeight} className="text-muted-foreground">
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
          <line
            key={i}
            x1="30"
            y1={chartHeight - (chartHeight - 20) * ratio - 10}
            x2={chartWidth}
            y2={chartHeight - (chartHeight - 20) * ratio - 10}
            stroke="currentColor"
            strokeDasharray="4"
            opacity="0.2"
          />
        ))}

        {/* Gradient area */}
        <defs>
          <linearGradient id="profitGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22C55E" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#22C55E" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path d={`M ${areaPoints} L ${bottomPoints} Z`} fill="url(#profitGradient)" />

        {/* Line */}
        <polyline
          points={areaPoints}
          fill="none"
          stroke="#22C55E"
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
          <div className="w-3 h-3 rounded bg-success" />
          <span className="text-muted-foreground">Daily Profit</span>
        </div>
      </div>
    </div>
  );
}
