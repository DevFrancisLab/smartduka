import React, { useState } from 'react';
import ReminderModal from './ReminderModal';
import EditDebtModalWrapper from './EditDebtModalWrapper';
import { Check, AlertCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface Debt {
  id: string;
  customerName: string;
  phoneNumber?: string;
  amountOwed: number;
  daysOverdue: number;
  notes: string;
  createdDate: string;
}

const SAMPLE_DEBTS: Debt[] = [
  {
    id: '1',
    customerName: 'James Kipchoge',
    phoneNumber: '+254712345678',
    amountOwed: 8500,
    daysOverdue: 12,
    notes: 'Rice purchase – promised payment Friday',
    createdDate: '2025-01-17',
  },
  {
    id: '2',
    customerName: 'Mary Okonkwo',
    phoneNumber: '+254723456789',
    amountOwed: 4200,
    daysOverdue: 8,
    notes: 'Maize flour bulk order',
    createdDate: '2025-01-21',
  },
  {
    id: '3',
    customerName: 'Joseph Otieno',
    phoneNumber: '+254734567890',
    amountOwed: 15000,
    daysOverdue: 15,
    notes: 'Stock purchase – repeated delays',
    createdDate: '2025-01-14',
  },
  {
    id: '4',
    customerName: 'Faith Kiplagat',
    phoneNumber: '+254745678901',
    amountOwed: 2800,
    daysOverdue: 3,
    notes: 'Sugar and salt – expected payment today',
    createdDate: '2025-01-26',
  },
  {
    id: '5',
    customerName: 'David Mwangi',
    phoneNumber: '+254756789012',
    amountOwed: 6500,
    daysOverdue: 6,
    notes: 'Oil delivery – awaiting remittance',
    createdDate: '2025-01-23',
  },
  {
    id: '6',
    customerName: 'Grace Kyalo',
    phoneNumber: '+254767890123',
    amountOwed: 3200,
    daysOverdue: 2,
    notes: 'Tea and coffee supplies',
    createdDate: '2025-01-27',
  },
  {
    id: '7',
    customerName: 'Peter Musa',
    phoneNumber: '+254778901234',
    amountOwed: 11000,
    daysOverdue: 20,
    notes: 'Bread & baked goods – no contact since purchase',
    createdDate: '2025-01-09',
  },
  {
    id: '8',
    customerName: 'Susan Njeri',
    phoneNumber: '+254789012345',
    amountOwed: 5500,
    daysOverdue: 5,
    notes: 'Mixed goods – customer availability issue',
    createdDate: '2025-01-24',
  },
  {
    id: '9',
    customerName: 'Robert Kariuki',
    phoneNumber: '+254790123456',
    amountOwed: 7300,
    daysOverdue: 9,
    notes: 'Wholesale purchase – partial payment received',
    createdDate: '2025-01-20',
  },
  {
    id: '10',
    customerName: 'Elizabeth Njoroge',
    phoneNumber: '+254701234567',
    amountOwed: 4800,
    daysOverdue: 1,
    notes: 'Fresh vegetables – brand new customer',
    createdDate: '2025-01-28',
  },
];

interface DebtsTableProps {
  searchQuery: string;
}

interface DebtsTablePropsExtended {
  searchQuery: string;
  newDebts?: Debt[];
  onUpdateDebt?: (d: Debt) => void;
  onDeleteDebt?: (id: string) => void;
}

export default function DebtsTable({ searchQuery, newDebts = [], onUpdateDebt, onDeleteDebt }: DebtsTablePropsExtended) {
  const [debts] = useState<Debt[]>(SAMPLE_DEBTS);

  // Combine sample debts with newly fetched/created debts passed from parent
  const combinedDebts = [...debts, ...newDebts];

  // Filter debts based on search query
  const filteredDebts = combinedDebts.filter((debt) =>
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
    // Marking as paid toggles paid state server-side — we'll call PATCH to set paid=true
    const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://127.0.0.1:8000';
    fetch(`${API_BASE}/api/debts/${debtId}/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paid: true }),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed to mark paid');
        const data = await res.json();
        if (onUpdateDebt) {
          onUpdateDebt({
            id: data.id,
            customerName: data.customer_name,
            amountOwed: Number(data.amount),
            daysOverdue: data.due_date ? Math.max(0, Math.floor((Date.now() - new Date(data.due_date).getTime()) / (1000 * 60 * 60 * 24))) : 0,
            notes: data.notes || '',
            createdDate: data.created_at ? data.created_at.split('T')[0] : (data.due_date || new Date().toISOString().split('T')[0]),
          });
        }
      })
      .catch(() => {
        console.log(`Mark debt ${debtId} as paid (local only)`);
      });
  };

  const handleSendReminder = (debtId: string, customerName: string) => {
    const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://127.0.0.1:8000';
    const url = `${API_BASE}/api/debts/${debtId}/remind/`;
    // Optional: allow custom message in future
    fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' } })
      .then(async (res) => {
        if (!res.ok) {
          const txt = await res.text();
          throw new Error(txt || 'Failed to send reminder');
        }
        alert(`Reminder sent to ${customerName}`);
      })
      .catch((err) => {
        console.error('Reminder failed', err);
        alert(`Failed to send reminder to ${customerName}`);
      });
  };

  // Edit / Delete UI state
  const [editingDebt, setEditingDebt] = useState<Debt | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  // Reminder modal state
  const [reminderOpen, setReminderOpen] = useState(false);
  const [reminderDebt, setReminderDebt] = useState<Debt | null>(null);

  const openEdit = (d: Debt) => {
    setEditingDebt(d);
    setIsEditOpen(true);
  };

  const openReminder = (d: Debt) => {
    setReminderDebt(d);
    setReminderOpen(true);
  };

  const handleDelete = (id: string) => {
    if (!confirm('Delete this debt? This action cannot be undone.')) return;
    const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://127.0.0.1:8000';
    fetch(`${API_BASE}/api/debts/${id}/`, { method: 'DELETE' })
      .then((res) => {
        if (res.ok) {
          if (onDeleteDebt) onDeleteDebt(id);
        } else {
          throw new Error('Delete failed');
        }
      })
      .catch(() => {
        // fallback: notify parent to remove locally
        if (onDeleteDebt) onDeleteDebt(id);
      });
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
                  {debt.phoneNumber && <p className="text-sm text-muted-foreground mb-1">Phone: {debt.phoneNumber}</p>}
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
                  onClick={() => openReminder(debt)}
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
        {/* Make the table body scrollable vertically */}
        <div className="max-h-96 overflow-y-auto">
          <table className="w-full">
          <thead className="bg-muted/30 border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Customer Name</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Phone</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground">Amount Owed</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Notes</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDebts.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground text-sm">
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
                    <td className="px-4 py-3 text-sm text-foreground">{debt.phoneNumber || '-'}</td>
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
                          variant="outline"
                          className="h-7 px-2 text-xs"
                          onClick={() => openEdit(debt)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="h-7 px-2 text-xs"
                          onClick={() => handleDelete(debt.id)}
                        >
                          Delete
                        </Button>
                        <Button
                          size="sm"
                          className="h-7 px-2 text-xs bg-gradient-gold hover:bg-gradient-gold/90 text-gray-900 font-semibold shadow-sm hover:shadow-md transition-colors transform hover:-translate-y-0.5 cursor-pointer"
                          title="Send reminder"
                          onClick={() => openReminder(debt)}
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
      {/* Edit Debt Modal (placed here so it can update items and reuse handlers) */}
      {isEditOpen && editingDebt ? (
        // lazy load modal component to avoid circular imports
        <EditDebtModalWrapper debt={editingDebt} open={isEditOpen} onClose={() => setIsEditOpen(false)} onUpdateDebt={(d: Debt) => { if (onUpdateDebt) onUpdateDebt(d); setIsEditOpen(false); }} />
      ) : null}
      {/* Reminder Modal (compose message) */}
      {reminderDebt ? (
        // lazy import to avoid circular issues
        <React.Suspense>
          {/* @ts-ignore - dynamic import not necessary here */}
          <ReminderModal
            open={reminderOpen}
            onClose={() => { setReminderOpen(false); setReminderDebt(null); }}
            customerName={reminderDebt.customerName}
            defaultMessage={`Hello ${reminderDebt.customerName}, this is a reminder that you owe Ksh ${reminderDebt.amountOwed.toLocaleString()}. Please settle at your earliest convenience.`}
            onSend={async (message: string) => {
              const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://127.0.0.1:8000';
              const url = `${API_BASE}/api/debts/${reminderDebt.id}/remind/`;
              const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message }) });
              if (!res.ok) {
                const txt = await res.text();
                throw new Error(txt || 'Failed to send reminder');
              }
              alert(`Reminder sent to ${reminderDebt.customerName}`);
            }}
          />
        </React.Suspense>
      ) : null}
    </>
  );
}
