import { useState } from 'react';
import { Check, AlertCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Debt {
  id: string;
  customerName: string;
  amountOwed: number;
  daysOverdue: number;
  notes: string;
  createdDate: string;
}

const SAMPLE_DEBTS: Debt[] = [
  {
    id: '1',
    customerName: 'James Kipchoge',
    amountOwed: 8500,
    daysOverdue: 12,
    notes: 'Rice purchase – promised payment Friday',
    createdDate: '2025-01-17',
  },
  {
    id: '2',
    customerName: 'Mary Okonkwo',
    amountOwed: 4200,
    daysOverdue: 8,
    notes: 'Maize flour bulk order',
    createdDate: '2025-01-21',
  },
  {
    id: '3',
    customerName: 'Joseph Otieno',
    amountOwed: 15000,
    daysOverdue: 15,
    notes: 'Stock purchase – repeated delays',
    createdDate: '2025-01-14',
  },
  {
    id: '4',
    customerName: 'Faith Kiplagat',
    amountOwed: 2800,
    daysOverdue: 3,
    notes: 'Sugar and salt – expected payment today',
    createdDate: '2025-01-26',
  },
  {
    id: '5',
    customerName: 'David Mwangi',
    amountOwed: 6500,
    daysOverdue: 6,
    notes: 'Oil delivery – awaiting remittance',
    createdDate: '2025-01-23',
  },
  {
    id: '6',
    customerName: 'Grace Kyalo',
    amountOwed: 3200,
    daysOverdue: 2,
    notes: 'Tea and coffee supplies',
    createdDate: '2025-01-27',
  },
  {
    id: '7',
    customerName: 'Peter Musa',
    amountOwed: 11000,
    daysOverdue: 20,
    notes: 'Bread & baked goods – no contact since purchase',
    createdDate: '2025-01-09',
  },
  {
    id: '8',
    customerName: 'Susan Njeri',
    amountOwed: 5500,
    daysOverdue: 5,
    notes: 'Mixed goods – customer availability issue',
    createdDate: '2025-01-24',
  },
  {
    id: '9',
    customerName: 'Robert Kariuki',
    amountOwed: 7300,
    daysOverdue: 9,
    notes: 'Wholesale purchase – partial payment received',
    createdDate: '2025-01-20',
  },
  {
    id: '10',
    customerName: 'Elizabeth Njoroge',
    amountOwed: 4800,
    daysOverdue: 1,
    notes: 'Fresh vegetables – brand new customer',
    createdDate: '2025-01-28',
  },
];

interface DebtsTableProps {
  searchQuery: string;
}

export default function DebtsTable({ searchQuery }: DebtsTableProps) {
  const [debts] = useState<Debt[]>(SAMPLE_DEBTS);

  // Filter debts based on search query
  const filteredDebts = debts.filter((debt) =>
    debt.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    debt.amountOwed.toString().includes(searchQuery)
  );

  const getStatusColor = (daysOverdue: number) => {
    if (daysOverdue > 7) {
      return {
        badge: 'bg-destructive/10 text-destructive',
        border: 'border-destructive/20',
        icon: AlertCircle,
        label: `${daysOverdue}d overdue`,
      };
    }
    if (daysOverdue > 0) {
      return {
        badge: 'bg-yellow-500/10 text-yellow-600',
        border: 'border-yellow-500/20',
        icon: Clock,
        label: `${daysOverdue}d overdue`,
      };
    }
    return {
      badge: 'bg-success/10 text-success',
      border: 'border-success/20',
      icon: Check,
      label: 'Recent',
    };
  };

  const handleMarkAsPaid = (debtId: string) => {
    console.log(`Mark debt ${debtId} as paid`);
  };

  const handleSendReminder = (debtId: string, customerName: string) => {
    console.log(`Send reminder to ${customerName} (debt ${debtId})`);
  };

  // Mobile view: card layout
  const mobileView = (
    <div className="space-y-3 lg:hidden">
      {filteredDebts.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p>No debts found matching your search</p>
        </div>
      ) : (
        filteredDebts.map((debt, idx) => {
          const status = getStatusColor(debt.daysOverdue);
          const StatusIcon = status.icon;

          return (
            <div
              key={debt.id}
              className={`bg-card border rounded-lg p-4 shadow-sm ${status.border}`}
            >
              {/* Customer name and days overdue */}
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-foreground text-sm">{debt.customerName}</h3>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${status.badge}`}>
                  <StatusIcon className="w-3 h-3" />
                  <span>{status.label}</span>
                </div>
              </div>

              {/* Amount owed */}
              <p className="text-lg sm:text-xl font-bold text-gradient-gold mb-2">Ksh {debt.amountOwed.toLocaleString()}</p>

              {/* Notes */}
              {debt.notes && <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{debt.notes}</p>}

              {/* Action buttons */}
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 h-8 text-xs border-destructive text-destructive hover:bg-destructive/10"
                  onClick={() => handleMarkAsPaid(debt.id)}
                >
                  <Check className="w-3 h-3 mr-1" />
                  Paid
                </Button>
                <Button
                  size="sm"
                  className="flex-1 h-8 text-xs bg-gradient-gold hover:bg-gradient-gold/90 text-gray-900 font-semibold"
                  onClick={() => handleSendReminder(debt.id, debt.customerName)}
                >
                  Remind
                </Button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );

  // Desktop view: table layout
  const desktopView = (
    <div className="hidden lg:block bg-card border border-border rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30 border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Customer Name</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground">Amount Owed</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Notes</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDebts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground text-sm">
                  No debts found matching your search
                </td>
              </tr>
            ) : (
              filteredDebts.map((debt, idx) => {
                const status = getStatusColor(debt.daysOverdue);
                const StatusIcon = status.icon;
                const isAlternate = idx % 2 === 1;

                return (
                  <tr key={debt.id} className={`${isAlternate ? 'bg-muted/20' : ''} border-b border-border/50 hover:bg-muted/30 transition-colors`}>
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{debt.customerName}</td>
                    <td className="px-4 py-3 text-right text-sm font-bold text-gradient-gold">{`Ksh ${debt.amountOwed.toLocaleString()}`}</td>
                    <td className="px-4 py-3 text-center">
                      <div className={`flex items-center justify-center gap-1 px-2 py-1 rounded-md text-xs font-medium w-fit mx-auto ${status.badge}`}>
                        <StatusIcon className="w-3 h-3" />
                        <span>{status.label}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground max-w-xs truncate" title={debt.notes}>
                      {debt.notes}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex gap-2 justify-center">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 px-2 text-xs border border-destructive text-destructive hover:bg-destructive/10"
                          onClick={() => handleMarkAsPaid(debt.id)}
                        >
                          <Check className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          className="h-7 px-2 text-xs bg-gradient-gold hover:bg-gradient-gold/90 text-gray-900 font-semibold"
                          onClick={() => handleSendReminder(debt.id, debt.customerName)}
                        >
                          Remind
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Summary footer */}
      <div className="px-4 py-3 bg-muted/20 border-t border-border flex flex-col sm:flex-row gap-4 text-xs">
        <div>
          <span className="text-muted-foreground">Total Debts: </span>
          <span className="font-bold text-foreground">{filteredDebts.length}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Total Amount: </span>
          <span className="font-bold text-gradient-gold">
            Ksh {filteredDebts.reduce((sum, d) => sum + d.amountOwed, 0).toLocaleString()}
          </span>
        </div>
        <div>
          <span className="text-muted-foreground">Critical Debts: </span>
          <span className="font-bold text-destructive">{filteredDebts.filter((d) => d.daysOverdue > 7).length}</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {mobileView}
      {desktopView}
    </>
  );
}
