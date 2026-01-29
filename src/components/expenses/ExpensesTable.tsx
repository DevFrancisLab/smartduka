import { ChevronRight } from 'lucide-react';

interface ExpenseRecord {
  id: string;
  type: string;
  amount: number;
  notes: string;
  time: string;
}

const ExpensesTable = () => {
  const expenses: ExpenseRecord[] = [
    { id: '1', type: 'Transport', amount: 200, notes: 'To market', time: '03:15 PM' },
    { id: '2', type: 'Lunch', amount: 150, notes: 'Staff lunch', time: '02:45 PM' },
    { id: '3', type: 'Delivery', amount: 300, notes: 'Customer delivery', time: '02:10 PM' },
    { id: '4', type: 'Transport', amount: 180, notes: 'Return trip', time: '01:50 PM' },
    { id: '5', type: 'Supplies', amount: 600, notes: 'Bags & tape', time: '01:25 PM' },
    { id: '6', type: 'Rent', amount: 1200, notes: 'Daily share', time: '12:45 PM' },
    { id: '7', type: 'Lunch', amount: 130, notes: 'Owner', time: '12:10 PM' },
    { id: '8', type: 'Delivery', amount: 250, notes: 'Courier', time: '11:50 AM' },
    { id: '9', type: 'Transport', amount: 220, notes: 'Suppliers pickup', time: '11:30 AM' },
    { id: '10', type: 'Misc', amount: 90, notes: 'Stationery', time: '11:05 AM' },
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden flex flex-col h-full">
      {/* Table Header */}
      <div className="hidden md:grid md:grid-cols-4 gap-4 px-4 py-3 border-b border-border bg-muted-foreground/3 font-semibold text-sm text-foreground sticky top-0">
        <div>Expense Type</div>
        <div className="text-right">Amount (Ksh)</div>
        <div className="">Notes</div>
        <div className="text-right">Time</div>
      </div>

      {/* Table Body - Scrollable */}
      <div className="overflow-y-auto flex-1">
        {expenses.map((exp, idx) => (
          <div
            key={exp.id}
            className={`px-4 py-3 border-b border-border last:border-b-0 hover:bg-muted-foreground/5 transition-colors cursor-pointer ${
              idx % 2 === 0 ? 'bg-muted-foreground/2' : ''
            }`}
          >
            {/* Mobile View */}
            <div className="md:hidden space-y-2">
              <div className="flex items-start justify-between">
                <p className="text-sm font-medium text-foreground flex-1 pr-2">{exp.type}</p>
                <ChevronRight className="w-4 h-4 text-muted-foreground/50 flex-shrink-0 mt-0.5" />
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <p className="text-muted-foreground">Amount</p>
                  <p className="font-semibold text-destructive">Ksh {exp.amount}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-muted-foreground">Notes</p>
                  <p className="font-semibold text-foreground truncate">{exp.notes}</p>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">{exp.time}</p>
            </div>

            {/* Desktop View */}
            <div className="hidden md:grid md:grid-cols-4 gap-4 items-center text-sm">
              <div className="font-medium text-foreground">{exp.type}</div>
              <div className="text-right font-semibold text-destructive">Ksh {exp.amount}</div>
              <div className="text-foreground truncate">{exp.notes}</div>
              <div className="text-right text-muted-foreground flex items-center justify-end gap-2">
                <span>{exp.time}</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-border bg-muted-foreground/3">
        <button className="w-full text-center text-sm text-gradient-gold hover:text-gradient-gold/80 transition-colors font-medium">
          Load More Expenses →
        </button>
      </div>
    </div>
  );
};

export default ExpensesTable;
