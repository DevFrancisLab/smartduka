import { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import ReportsHeader from '@/components/reports/ReportsHeader';
import DateRangeSelector from '@/components/reports/DateRangeSelector';
import ReportsSummary from '@/components/reports/ReportsSummary';
import SalesVsExpensesChart from '@/components/reports/SalesVsExpensesChart';
import ProfitChart from '@/components/reports/ProfitChart';
import StockChart from '@/components/reports/StockChart';
import ReportsInsights from '@/components/reports/ReportsInsights';

export default function Reports() {
  const [dateRange, setDateRange] = useState('month');

  return (
    <DashboardLayout active="reports">
      <ReportsHeader />

      {/* Date Range Selector */}
      <DateRangeSelector selectedRange={dateRange} onRangeChange={setDateRange} />

      {/* Summary KPI Cards */}
      <ReportsSummary range={dateRange} />

      {/* Charts Section */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Sales vs Expenses */}
        <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-foreground mb-3">Sales vs Expenses</h3>
          <SalesVsExpensesChart range={dateRange} />
        </div>

        {/* Profit Over Time */}
        <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-foreground mb-3">Profit Trend</h3>
          <ProfitChart range={dateRange} />
        </div>
      </div>

      {/* Stock Levels */}
      <div className="mt-4 bg-card border border-border rounded-lg p-4 shadow-sm">
        <h3 className="text-lg font-semibold text-foreground mb-3">Top Items Stock Levels</h3>
        <StockChart range={dateRange} />
      </div>

      {/* Insights */}
      <div className="mt-4">
        <ReportsInsights range={dateRange} />
      </div>
    </DashboardLayout>
  );
}
