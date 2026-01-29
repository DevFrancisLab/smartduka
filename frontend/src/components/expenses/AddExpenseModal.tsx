import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddExpense: (expense: ExpenseData) => void;
}

export interface ExpenseData {
  type: string;
  amount: number;
  notes: string;
  date: string;
}

const EXPENSE_TYPES = [
  'Transport',
  'Lunch',
  'Delivery',
  'Supplies',
  'Rent',
  'Utilities',
  'Maintenance',
  'Other',
];

export default function AddExpenseModal({ isOpen, onClose, onAddExpense }: AddExpenseModalProps) {
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Validation
    if (!type) newErrors.type = 'Expense type is required';
    if (!amount || parseFloat(amount) <= 0) newErrors.amount = 'Amount must be greater than 0';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const today = new Date().toISOString().split('T')[0];

    const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://127.0.0.1:8000';

    fetch(`${API_BASE}/api/expenses/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type,
        amount: parseFloat(amount),
        notes,
        date: today,
      }),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed to save expense');
        const data = await res.json();
        onAddExpense({
          type: data.type || type,
          amount: data.amount || parseFloat(amount),
          notes: data.notes || notes,
          date: data.date || today,
        });
      })
      .catch(() => {
        onAddExpense({
          type,
          amount: parseFloat(amount),
          notes,
          date: today,
        });
      });

    // Reset form
    setType('');
    setAmount('');
    setNotes('');
    setErrors({});
    onClose();
  };

  const handleClose = () => {
    setType('');
    setAmount('');
    setNotes('');
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Add Expense</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Record a new business expense
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Expense Type */}
          <div className="space-y-2">
            <Label htmlFor="type" className="text-foreground">
              Expense Type
            </Label>
            <select
              id="type"
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                if (errors.type) setErrors({ ...errors, type: '' });
              }}
              className="w-full px-3 py-2 bg-muted text-foreground border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-destructive/30"
            >
              <option value="">Select expense type...</option>
              {EXPENSE_TYPES.map((expenseType) => (
                <option key={expenseType} value={expenseType}>
                  {expenseType}
                </option>
              ))}
            </select>
            {errors.type && <p className="text-xs text-destructive">{errors.type}</p>}
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-foreground">
              Amount (Ksh)
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="e.g., 500"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                if (errors.amount) setErrors({ ...errors, amount: '' });
              }}
              className="bg-muted text-foreground border-border placeholder-muted-foreground focus:ring-destructive/30"
            />
            {errors.amount && <p className="text-xs text-destructive">{errors.amount}</p>}
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-foreground">
              Notes (optional)
            </Label>
            <textarea
              id="notes"
              placeholder="Add any details about this expense..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 bg-muted text-foreground border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-destructive/30 text-sm resize-none"
              rows={3}
            />
          </div>

          {/* Amount display */}
          {amount && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-xs text-muted-foreground">Expense Amount</p>
              <p className="text-xl font-bold text-destructive">
                Ksh {parseFloat(amount).toLocaleString()}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1 border-border text-foreground hover:bg-muted-foreground/5"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-destructive hover:bg-destructive/90 text-white font-semibold"
            >
              Add Expense
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
