import { AlertCircle, Clock } from "lucide-react";

interface Debt {
  id: string;
  customerName: string;
  amountOwed: number;
  daysOverdue: number;
}

const DebtTracker = () => {
  // Demo data: up to 5 unpaid debts
  const debts: Debt[] = [
    { id: "1", customerName: "Ahmed Mohamed", amountOwed: 5500, daysOverdue: 14 },
    { id: "2", customerName: "Grace Kipchoge", amountOwed: 3200, daysOverdue: 9 },
    { id: "3", customerName: "Peter Mwangi", amountOwed: 2100, daysOverdue: 4 },
    { id: "4", customerName: "Susan Mukami", amountOwed: 1800, daysOverdue: 1 },
    { id: "5", customerName: "James Kiplagat", amountOwed: 4300, daysOverdue: 21 },
  ];

  // Determine overdue status color and icon
  const getOverdueStatus = (daysOverdue: number) => {
    if (daysOverdue > 7) {
      return {
        bgColor: "bg-red-900/20",
        textColor: "text-red-400",
        borderColor: "border-red-700/30",
        amountColor: "text-red-400",
        badgeColor: "bg-red-500/20 text-red-300 border-red-600/30",
        icon: true,
        label: `${daysOverdue}d overdue`
      };
    } else if (daysOverdue > 0) {
      return {
        bgColor: "bg-yellow-900/15",
        textColor: "text-yellow-600",
        borderColor: "border-yellow-700/20",
        amountColor: "text-yellow-400",
        badgeColor: "bg-yellow-500/15 text-yellow-600 border-yellow-600/20",
        icon: false,
        label: `${daysOverdue}d overdue`
      };
    }
    return {
      bgColor: "hover:bg-muted-foreground/5",
      textColor: "text-muted-foreground",
      borderColor: "border-border",
      amountColor: "text-gradient-gold",
      badgeColor: "bg-muted-foreground/10 text-muted-foreground border-border",
      icon: false,
      label: "Due today"
    };
  };

  return (
    <div className="bg-card border border-border rounded-lg p-3 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <AlertCircle className="w-5 h-5 text-red-400" />
        <h2 className="text-lg font-semibold text-foreground">Debts – Danger Zone</h2>
      </div>

      {/* Debts List */}
      <div className="space-y-2">
        {debts.map((debt, idx) => {
          const status = getOverdueStatus(debt.daysOverdue);
          
          return (
            <div
              key={debt.id}
              className={`p-2 sm:p-3 rounded-lg border transition-colors duration-200 ${
                status.bgColor
              } ${status.borderColor} ${idx % 2 === 0 ? "" : ""}`}
            >
              {/* Customer name + overdue badge */}
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="text-sm font-medium text-foreground leading-tight">
                  {debt.customerName}
                </h3>
                <div className={`flex items-center gap-1 px-2 py-1 rounded border text-xs font-medium whitespace-nowrap ${status.badgeColor}`}>
                  {status.icon && <AlertCircle className="w-3 h-3" />}
                  <span>{status.label}</span>
                </div>
              </div>

              {/* Amount and days overdue */}
              <div className="flex items-baseline justify-between">
                <span className={`text-base sm:text-lg font-bold ${status.amountColor}`}>
                  Ksh {debt.amountOwed.toLocaleString()}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer link */}
      <div className="mt-4 pt-3 border-t border-border">
        <button className="text-xs text-gradient-gold hover:opacity-80 transition-opacity font-medium">
          View All Debts & Payment History →
        </button>
      </div>
    </div>
  );
};

export default DebtTracker;
