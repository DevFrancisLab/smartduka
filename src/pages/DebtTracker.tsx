import { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import DebtHeader from '@/components/debt/DebtHeader';
import DebtsTable from '@/components/debt/DebtsTable';

export default function DebtTracker() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <DashboardLayout active="debttracker">
      <DebtHeader />

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
      <DebtsTable searchQuery={searchQuery} />
    </DashboardLayout>
  );
}
