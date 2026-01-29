import { ChevronRight } from 'lucide-react';

interface FloatChange {
  id: string;
  action: 'Add' | 'Deduct';
  amount: number;
  time: string;
  notes?: string;
}

const CashHistory = () => {
  const history: FloatChange[] = [
    { id: '1', action: 'Add', amount: 1000, time: '2026-01-17 09:15', notes: 'Top-up' },
    { id: '2', action: 'Deduct', amount: 200, time: '2026-01-17 12:20', notes: 'Lunch' },
    { id: '3', action: 'Deduct', amount: 150, time: '2026-01-17 14:05', notes: 'Transport' },
    { id: '4', action: 'Add', amount: 500, time: '2026-01-16 10:10', notes: 'Deposit' },
    { id: '5', action: 'Deduct', amount: 100, time: '2026-01-16 13:40', notes: 'Misc' },
    { id: '6', action: 'Add', amount: 200, time: '2026-01-15 09:00', notes: 'Top-up' },
    { id: '7', action: 'Deduct', amount: 300, time: '2026-01-15 11:05', notes: 'Delivery' },
    { id: '8', action: 'Add', amount: 400, time: '2026-01-14 08:50', notes: 'Top-up' },
    { id: '9', action: 'Deduct', amount: 250, time: '2026-01-14 13:15', notes: 'Transport' },
    { id: '10', action: 'Add', amount: 500, time: '2026-01-13 09:10', notes: 'Top-up' },
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-3 shadow-sm">
      <h3 className="text-lg font-semibold text-foreground mb-3">Cash Float History</h3>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {history.map((h, idx) => (
          <div key={h.id} className={`flex items-center justify-between p-2 rounded-lg hover:bg-muted-foreground/5 transition-colors cursor-pointer ${idx % 2 === 0 ? 'bg-muted-foreground/2' : ''}`}>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{h.action}</p>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">{h.notes}</p>
            </div>

            <div className="text-right ml-3">
              <p className={`font-semibold ${h.action === 'Add' ? 'text-gradient-gold' : 'text-destructive'}`}>Ksh {h.amount}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{h.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CashHistory;
