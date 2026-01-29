import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface UpdateCashFloatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateCashFloat: (transaction: CashFloatTransaction) => void;
  currentFloat?: number;
}

export interface CashFloatTransaction {
  action: 'add' | 'deduct';
  amount: number;
  notes: string;
  date: string;
}

export default function UpdateCashFloatModal({
  isOpen,
  onClose,
  onUpdateCashFloat,
  currentFloat = 2500,
}: UpdateCashFloatModalProps) {
  const [action, setAction] = useState<'add' | 'deduct'>('add');
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Validation
    if (!amount || parseFloat(amount) <= 0) newErrors.amount = 'Amount must be greater than 0';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://127.0.0.1:8000';

    fetch(`${API_BASE}/api/cashfloat/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action,
        amount: parseFloat(amount),
        notes,
        date: today,
      }),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed to save cash float transaction');
        const data = await res.json();
        onUpdateCashFloat({
          action: data.action || action,
          amount: data.amount || parseFloat(amount),
          notes: data.notes || notes,
          date: data.date || today,
        });
      })
      .catch(() => {
        onUpdateCashFloat({
          action,
          amount: parseFloat(amount),
          notes,
          date: today,
        });
      });

    // Reset form
    setAction('add');
    setAmount('');
    setNotes('');
    setErrors({});
    onClose();
  };

  const handleClose = () => {
    setAction('add');
    setAmount('');
    setNotes('');
    setErrors({});
    onClose();
  };

  const getButtonColor = () => {
    return action === 'add' ? 'bg-success hover:bg-success/90' : 'bg-destructive hover:bg-destructive/90';
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Update Cash Float</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Add or deduct cash from your daily float
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Current Float Display */}
          <div className="p-3 bg-gradient-gold/10 border border-gradient-gold/20 rounded-lg">
            <p className="text-xs text-muted-foreground">Current Float</p>
            <p className="text-2xl font-bold text-gradient-gold">
              Ksh {currentFloat.toLocaleString()}
            </p>
          </div>

          {/* Action Selection */}
          <div className="space-y-2">
            <Label className="text-foreground">Action</Label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setAction('add')}
                className={`flex-1 py-2 px-3 rounded-lg font-semibold transition-colors text-white text-sm ${
                  action === 'add' ? 'bg-success' : 'bg-muted-foreground/20'
                }`}
              >
                + Add Cash
              </button>
              <button
                type="button"
                onClick={() => setAction('deduct')}
                className={`flex-1 py-2 px-3 rounded-lg font-semibold transition-colors text-white text-sm ${
                  action === 'deduct' ? 'bg-destructive' : 'bg-muted-foreground/20'
                }`}
              >
                - Deduct Cash
              </button>
            </div>
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-foreground">
              Amount (Ksh)
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="e.g., 5000"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                if (errors.amount) setErrors({ ...errors, amount: '' });
              }}
              className="bg-muted text-foreground border-border placeholder-muted-foreground focus:ring-gradient-gold/30"
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
              placeholder="Reason for adjustment (e.g., Bank deposit, Change from customer, etc.)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 bg-muted text-foreground border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-gradient-gold/30 text-sm resize-none"
              rows={3}
            />
          </div>

          {/* Preview new float */}
          {amount && (
            <div
              className={`p-3 rounded-lg border ${
                action === 'add'
                  ? 'bg-success/10 border-success/20'
                  : 'bg-destructive/10 border-destructive/20'
              }`}
            >
              <p className="text-xs text-muted-foreground">New Float After Transaction</p>
              <p
                className={`text-xl font-bold ${action === 'add' ? 'text-success' : 'text-destructive'}`}
              >
                Ksh{' '}
                {(
                  currentFloat +
                  (action === 'add' ? parseFloat(amount) : -parseFloat(amount))
                ).toLocaleString()}
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
              className={`flex-1 text-white font-semibold ${getButtonColor()}`}
            >
              {action === 'add' ? 'Add to Float' : 'Deduct from Float'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
