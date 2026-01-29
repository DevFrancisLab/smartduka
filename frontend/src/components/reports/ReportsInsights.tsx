import { TrendingUp, AlertCircle, ShoppingCart } from 'lucide-react';

interface ReportsInsightsProps {
  range: string;
}

export default function ReportsInsights({ range }: ReportsInsightsProps) {
  const insights = [
    {
      icon: TrendingUp,
      title: 'Top Selling Item',
      value: 'Rice (50kg)',
      detail: '42 units sold this month',
      color: 'text-gradient-gold',
      bgColor: 'bg-gradient-gold/10',
    },
    {
      icon: AlertCircle,
      title: 'Highest Expense',
      value: 'Rent & Utilities',
      detail: 'Ksh 8,500 this month',
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',
    },
    {
      icon: ShoppingCart,
      title: 'Low Stock Alert',
      value: 'Cooking Oil',
      detail: 'Only 12 units left (12% of max)',
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',
    },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold text-foreground mb-3">Key Insights</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {insights.map((insight) => {
          const Icon = insight.icon;
          return (
            <div
              key={insight.title}
              className="bg-card border border-border rounded-lg p-4 shadow-sm hover:border-border/50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className={`${insight.bgColor} p-2 rounded-lg mt-1`}>
                  <Icon className={`${insight.color} w-4 h-4 sm:w-5 sm:h-5`} />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground font-medium">{insight.title}</p>
                  <p className={`${insight.color} font-bold mt-1 text-sm sm:text-base`}>{insight.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{insight.detail}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
