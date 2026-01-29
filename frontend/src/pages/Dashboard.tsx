import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/layouts/DashboardLayout';
import KpiCards from '@/components/dashboard/KpiCards';
import QuickActions from '@/components/dashboard/QuickActions';
import RecentSales from '@/components/dashboard/RecentSales';
import DebtTracker from '@/components/dashboard/DebtTracker';
import ReceiptsCapture from '@/components/dashboard/ReceiptsCapture';
import AddSaleModal, { SaleData } from '@/components/sales/AddSaleModal';
import AddExpenseModal, { ExpenseData } from '@/components/expenses/AddExpenseModal';
import AddStockModal, { StockData } from '@/components/stock/AddStockModal';
import UpdateCashFloatModal, { CashFloatTransaction } from '@/components/cash/UpdateCashFloatModal';

export default function Dashboard() {
  const [isAddSaleOpen, setIsAddSaleOpen] = useState(false);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [isAddStockOpen, setIsAddStockOpen] = useState(false);
  const [isUpdateFloatOpen, setIsUpdateFloatOpen] = useState(false);
  const navigate = useNavigate();

  const handleAddSale = (sale: SaleData) => {
    console.log('Sale added from dashboard:', sale);
    setIsAddSaleOpen(false);
    navigate('/sales');
  };

  const handleAddExpense = (expense: ExpenseData) => {
    console.log('Expense added from dashboard:', expense);
    setIsAddExpenseOpen(false);
    navigate('/expenses');
  };

  const handleAddStock = (stock: StockData) => {
    console.log('Stock added from dashboard:', stock);
    setIsAddStockOpen(false);
    navigate('/stock');
  };

  const handleUpdateCashFloat = (transaction: CashFloatTransaction) => {
    console.log('Cash float updated from dashboard:', transaction);
    setIsUpdateFloatOpen(false);
    navigate('/cashfloat');
  };

  return (
    <DashboardLayout>
      {/* Dashboard KPI cards */}
      <KpiCards />

      {/* Quick Actions Bar */}
      <QuickActions
        onAddSale={() => setIsAddSaleOpen(true)}
        onAddExpense={() => setIsAddExpenseOpen(true)}
        onAddStock={() => setIsAddStockOpen(true)}
        onUpdateCashFloat={() => setIsUpdateFloatOpen(true)}
      />

      {/* Main content grid: Recent Sales + Debt Tracker */}
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 min-h-0">
        {/* Recent Sales - spans full width on mobile, 2 columns on lg */}
        <div className="lg:col-span-2 min-h-0 overflow-y-auto">
          <RecentSales />
        </div>

        {/* Debt Tracker - right sidebar */}
        <div className="min-h-0 overflow-y-auto">
          <DebtTracker />
        </div>
      </div>

      {/* Secondary section: Receipts Capture */}
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <ReceiptsCapture />
        </div>
      </div>

      {/* Add Sale Modal */}
      <AddSaleModal
        isOpen={isAddSaleOpen}
        onClose={() => setIsAddSaleOpen(false)}
        onAddSale={handleAddSale}
      />

      {/* Add Expense Modal */}
      <AddExpenseModal
        isOpen={isAddExpenseOpen}
        onClose={() => setIsAddExpenseOpen(false)}
        onAddExpense={handleAddExpense}
      />

      {/* Add Stock Modal */}
      <AddStockModal
        isOpen={isAddStockOpen}
        onClose={() => setIsAddStockOpen(false)}
        onAddStock={handleAddStock}
      />

      {/* Update Cash Float Modal */}
      <UpdateCashFloatModal
        isOpen={isUpdateFloatOpen}
        onClose={() => setIsUpdateFloatOpen(false)}
        onUpdateCashFloat={handleUpdateCashFloat}
        currentFloat={2500}
      />
    </DashboardLayout>
  );
}
