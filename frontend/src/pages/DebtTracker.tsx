import { useEffect, useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import DebtHeader from '@/components/debt/DebtHeader';
import DebtsTable from '@/components/debt/DebtsTable';
import AddDebtModal from '@/components/debt/AddDebtModal';
import { Button } from '@/components/ui/button';

export default function DebtTracker() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDebtOpen, setIsAddDebtOpen] = useState(false);
  const [debtsData, setDebtsData] = useState<any[]>([]);

  // Load saved debts on mount
  useEffect(() => {
    const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://127.0.0.1:8000';
    fetch(`${API_BASE}/api/debts/`)
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed to fetch debts');
        const data = await res.json();
        const mapped = (data || []).map((d: any) => ({
          id: d.id,
          customerName: d.customer_name,
          phoneNumber: d.phone_number || '',
          amountOwed: Number(d.amount),
          daysOverdue: d.due_date ? Math.max(0, Math.floor((Date.now() - new Date(d.due_date).getTime()) / (1000 * 60 * 60 * 24))) : 0,
          notes: d.notes || '',
          createdDate: d.created_at ? d.created_at.split('T')[0] : (d.due_date || new Date().toISOString().split('T')[0]),
        }));
        setDebtsData(mapped);
      })
      .catch((err) => console.warn('Could not load debts:', err));
  }, []);

  const handleAddDebt = (debt: any) => {
    setDebtsData([...debtsData, debt]);
  };

  const handleUpdateDebt = (updated: any) => {
    setDebtsData((prev) => prev.map((d) => (d.id === updated.id ? updated : d)));
  };

  const handleDeleteDebt = (id: string) => {
    setDebtsData((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <DashboardLayout active="debttracker">
      <div className="flex items-start justify-between mb-4">
        <div>
          <DebtHeader />
        </div>
        <div className="ml-4">
          <Button onClick={() => setIsAddDebtOpen(true)} className="gradient-gold text-primary-foreground">Add Debt</Button>
        </div>
      </div>

      {/* Search bar */}
      <div className="mb-4 sm:mb-6">
        <input
          type="text"
          placeholder="Search customer name or amount..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-gradient-gold/30 text-sm sm:text-base"
        />
      </div>

      {/* Debts Table */}
      <DebtsTable searchQuery={searchQuery} newDebts={debtsData} onUpdateDebt={handleUpdateDebt} onDeleteDebt={handleDeleteDebt} />

      <AddDebtModal isOpen={isAddDebtOpen} onClose={() => setIsAddDebtOpen(false)} onAddDebt={handleAddDebt} />
    </DashboardLayout>
  );
}
