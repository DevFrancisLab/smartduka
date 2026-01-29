import DashboardLayout from '@/layouts/DashboardLayout';
import KpiCards from '@/components/dashboard/KpiCards';
import QuickActions from '@/components/dashboard/QuickActions';
import RecentSales from '@/components/dashboard/RecentSales';
import DebtTracker from '@/components/dashboard/DebtTracker';
import ReceiptsCapture from '@/components/dashboard/ReceiptsCapture';

export default function Dashboard() {
  return (
    <DashboardLayout>
      {/* Dashboard KPI cards */}
      <KpiCards />

      {/* Quick Actions Bar */}
      <QuickActions
        onAddSale={() => console.log('Add Sale')}
        onAddExpense={() => console.log('Add Expense')}
        onAddStock={() => console.log('Add Stock')}
        onUpdateCashFloat={() => console.log('Update Cash Float')}
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
    </DashboardLayout>
  );
}
