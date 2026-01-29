import { TrendingUp, TrendingDown } from 'lucide-react';

interface ReportsSummaryProps {
  range: string;
}

export default function ReportsSummary({ range }: ReportsSummaryProps) {
  // Demo data based on date range
  const data = {
    today: { sales: 12500, expenses: 3200, stock: 45000 },
    week: { sales: 68000, expenses: 15800, stock: 45000 },
    month: { sales: 285000, expenses: 68500, stock: 45000 },
    custom: { sales: 285000, expenses: 68500, stock: 45000 },
  };

  const selected = data[range as keyof typeof data] || data.month;
  const profit = selected.sales - selected.expenses;

  const kpis = [
    {
      label: 'Total Sales',
      value: `Ksh ${(selected.sales / 1000).toFixed(0)}k`,
      icon: TrendingUp,
      color: 'text-gradient-gold',
      bgColor: 'bg-gradient-gold/10',
    },
    {
      label: 'Total Expenses',
      value: `Ksh ${(selected.expenses / 1000).toFixed(0)}k`,
      icon: TrendingDown,
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',
    },
    {
      label: 'Profit',
      value: `Ksh ${(profit / 1000).toFixed(0)}k`,
      icon: TrendingUp,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      label: 'Stock Value',
      value: `Ksh ${(selected.stock / 1000).toFixed(0)}k`,
      icon: TrendingUp,
      color: 'text-gradient-gold',
      bgColor: 'bg-gradient-gold/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <div key={kpi.label} className="bg-card border border-border rounded-lg p-3 sm:p-4 shadow-sm">
            <div className="flex items-start justify-between mb-2">
              <span className="text-xs sm:text-sm text-muted-foreground font-medium">{kpi.label}</span>
              <div className={`${kpi.bgColor} p-2 rounded-md`}>
                <Icon className={`${kpi.color} w-4 h-4 sm:w-5 sm:h-5`} />
              </div>
            </div>
            <p className={`${kpi.color} text-lg sm:text-xl font-bold`}>{kpi.value}</p>
          </div>
        );
      })}
    </div>
  );
}
