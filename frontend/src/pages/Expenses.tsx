import { useEffect, useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import ExpensesHeader from '@/components/expenses/ExpensesHeader';
import ExpensesInsights from '@/components/expenses/ExpensesInsights';
import ExpensesTable from '@/components/expenses/ExpensesTable';
import AddExpenseModal, { ExpenseData } from '@/components/expenses/AddExpenseModal';

export default function Expenses() {
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [expensesData, setExpensesData] = useState<ExpenseData[]>([]);

  const handleAddExpense = (expense: ExpenseData) => {
    setExpensesData([...expensesData, expense]);
    console.log('Expense added:', expense);
  };

  // Load saved expenses from backend on mount
  useEffect(() => {
    const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://127.0.0.1:8000';

    fetch(`${API_BASE}/api/expenses/`)
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed to fetch expenses');
        const data = await res.json();
        const mapped: ExpenseData[] = (data || []).map((d: any) => ({
          type: d.type,
          amount: Number(d.amount),
          notes: d.notes || '',
          date: d.date || new Date().toISOString().split('T')[0],
        }));
        setExpensesData(mapped);
      })
      .catch((err) => console.warn('Could not load saved expenses:', err));
  }, []);

  const handleSearch = (query: string) => {
    console.log('Search expenses:', query);
  };

  return (
    <DashboardLayout active="expenses">
      <ExpensesHeader />

      <ExpensesInsights />

      <div className="mt-4">
        <Button
          onClick={() => setIsAddExpenseOpen(true)}
          className="gradient-gold text-primary-foreground hover:opacity-90 transition-all duration-300 font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          <Plus className="w-5 h-5" />
          <span>Add Expense</span>
        </Button>
      </div>

      {/* Search Bar */}
      <div className="mt-4 flex items-center gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by type, note, or date..."
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-gradient-gold/30"
          />
        </div>
      </div>

      {/* Expenses Table */}
      <div className="mt-4 flex-1 min-h-0 overflow-hidden flex flex-col">
        <ExpensesTable />
      </div>

      {/* Add Expense Modal */}
      <AddExpenseModal
        isOpen={isAddExpenseOpen}
        onClose={() => setIsAddExpenseOpen(false)}
        onAddExpense={handleAddExpense}
      />
    </DashboardLayout>
  );
}
