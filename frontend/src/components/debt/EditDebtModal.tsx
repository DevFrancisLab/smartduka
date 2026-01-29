import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface EditDebtModalProps {
  isOpen: boolean;
  onClose: () => void;
  debt: any | null;
  onUpdateDebt: (debt: any) => void;
}

export default function EditDebtModal({ isOpen, onClose, debt, onUpdateDebt }: EditDebtModalProps) {
  const [customerName, setCustomerName] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (debt) {
      setCustomerName(debt.customerName || '');
      setAmount(String(debt.amountOwed || ''));
      setDueDate(debt.due_date || debt.createdDate || '');
      setPhone(debt.phoneNumber || debt.phone_number || '');
      setNotes(debt.notes || '');
    }
  }, [debt]);

  const handleClose = () => {
    setCustomerName('');
    setAmount('');
    setDueDate('');
    setNotes('');
    setErrors({});
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!customerName.trim()) newErrors.customerName = 'Customer name is required';
    if (!amount || parseFloat(amount) <= 0) newErrors.amount = 'Amount must be greater than 0';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!debt) return;

    const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://127.0.0.1:8000';
    const payload = {
      customer_name: customerName,
      phone_number: phone || null,
      amount: parseFloat(amount),
      due_date: dueDate || null,
      notes,
    };

    fetch(`${API_BASE}/api/debts/${debt.id}/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed to update debt');
        const data = await res.json();
        onUpdateDebt({
          id: data.id,
          customerName: data.customer_name,
          phoneNumber: data.phone_number || phone || '',
          amountOwed: Number(data.amount),
          daysOverdue: data.due_date ? Math.max(0, Math.floor((Date.now() - new Date(data.due_date).getTime()) / (1000 * 60 * 60 * 24))) : 0,
          notes: data.notes || '',
          createdDate: data.created_at ? data.created_at.split('T')[0] : (data.due_date || new Date().toISOString().split('T')[0]),
        });
      })
      .catch(() => {
        // fallback local update
        onUpdateDebt({
          id: debt.id,
          customerName,
          phoneNumber: phone || debt.phoneNumber || '',
          amountOwed: parseFloat(amount),
          daysOverdue: dueDate ? Math.max(0, Math.floor((Date.now() - new Date(dueDate).getTime()) / (1000 * 60 * 60 * 24))) : debt.daysOverdue,
          notes,
          createdDate: debt.createdDate || new Date().toISOString().split('T')[0],
        });
      })
      .finally(() => handleClose());
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[520px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Edit Debt</DialogTitle>
          <DialogDescription className="text-muted-foreground">Update customer debt details</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customerName">Customer Name</Label>
            <Input id="customerName" value={customerName} onChange={(e) => { setCustomerName(e.target.value); if (errors.customerName) setErrors({ ...errors, customerName: '' }); }} />
            {errors.customerName && <p className="text-xs text-destructive">{errors.customerName}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount (Ksh)</Label>
            <Input id="amount" type="number" value={amount} onChange={(e) => { setAmount(e.target.value); if (errors.amount) setErrors({ ...errors, amount: '' }); }} />
            {errors.amount && <p className="text-xs text-destructive">{errors.amount}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input id="dueDate" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone (optional)</Label>
            <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g., 0712 345 678" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full px-3 py-2 bg-muted text-foreground border border-border rounded-lg focus:outline-none text-sm resize-none" rows={3} />
          </div>

          <div className="flex gap-2 pt-2">
            <Button type="button" variant="outline" onClick={handleClose} className="flex-1">Cancel</Button>
            <Button type="submit" className="flex-1 bg-gradient-gold text-primary-foreground">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
