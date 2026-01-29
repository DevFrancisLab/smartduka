import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AddDebtModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDebt: (debt: any) => void;
}

export default function AddDebtModal({ isOpen, onClose, onAddDebt }: AddDebtModalProps) {
  const [customerName, setCustomerName] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!customerName.trim()) newErrors.customerName = 'Customer name is required';
    if (!amount || parseFloat(amount) <= 0) newErrors.amount = 'Amount must be greater than 0';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://127.0.0.1:8000';
    const payload = {
      customer_name: customerName,
      phone_number: phone || null,
      amount: parseFloat(amount),
      due_date: dueDate || null,
      notes,
    };

    fetch(`${API_BASE}/api/debts/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed to save debt');
        const data = await res.json();
        onAddDebt({
          id: data.id || `new-${Date.now()}`,
          customerName: data.customer_name || customerName,
          phoneNumber: data.phone_number || phone || '',
          amountOwed: Number(data.amount || payload.amount),
          daysOverdue: data.due_date ? Math.max(0, Math.floor((Date.now() - new Date(data.due_date).getTime()) / (1000 * 60 * 60 * 24))) : 0,
          notes: data.notes || notes,
          createdDate: data.created_at || new Date().toISOString().split('T')[0],
        });
      })
      .catch(() => {
        // fallback: add locally
        onAddDebt({
          id: `new-${Date.now()}`,
          customerName,
          phoneNumber: phone || '',
          amountOwed: parseFloat(amount),
          daysOverdue: dueDate ? Math.max(0, Math.floor((Date.now() - new Date(dueDate).getTime()) / (1000 * 60 * 60 * 24))) : 0,
          notes,
          createdDate: new Date().toISOString().split('T')[0],
        });
      })
      .finally(() => {
        setCustomerName('');
        setAmount('');
        setDueDate('');
        setNotes('');
        setErrors({});
        onClose();
      });
  };

  const handleClose = () => {
    setCustomerName('');
    setAmount('');
    setDueDate('');
    setNotes('');
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[520px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Add Debt</DialogTitle>
          <DialogDescription className="text-muted-foreground">Record a customer debt or credit</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customerName">Customer Name</Label>
            <Input id="customerName" value={customerName} onChange={(e) => { setCustomerName(e.target.value); if (errors.customerName) setErrors({ ...errors, customerName: '' }); }} placeholder="e.g., John Mwangi" />
            {errors.customerName && <p className="text-xs text-destructive">{errors.customerName}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount (Ksh)</Label>
            <Input id="amount" type="number" value={amount} onChange={(e) => { setAmount(e.target.value); if (errors.amount) setErrors({ ...errors, amount: '' }); }} placeholder="e.g., 2500" />
            {errors.amount && <p className="text-xs text-destructive">{errors.amount}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date (optional)</Label>
            <Input id="dueDate" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone (optional)</Label>
            <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g., 0712 345 678" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full px-3 py-2 bg-muted text-foreground border border-border rounded-lg focus:outline-none text-sm resize-none" rows={3} />
          </div>

          <div className="flex gap-2 pt-2">
            <Button type="button" variant="outline" onClick={handleClose} className="flex-1">Cancel</Button>
            <Button type="submit" className="flex-1 bg-gradient-gold text-primary-foreground">Add Debt</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
