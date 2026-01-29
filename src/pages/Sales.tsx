import DashboardLayout from '@/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import SalesHeader from '@/components/sales/SalesHeader';
import SalesInsights from '@/components/sales/SalesInsights';
import SalesTable from '@/components/sales/SalesTable';

export default function Sales() {
  const handleAddSale = () => {
    console.log('Open Add Sale modal');
  };

  const handleSearch = (query: string) => {
    console.log('Search sales:', query);
  };

  return (
    <DashboardLayout active="sales">
      {/* Page Header */}
      <SalesHeader />

      {/* Sales Insights / Totals */}
      <SalesInsights />

      {/* Add Sale Button */}
      <div className="mt-4">
        <Button
          onClick={handleAddSale}
          className="gradient-gold text-primary-foreground hover:opacity-90 transition-all duration-300 font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Sale</span>
        </Button>
      </div>

      {/* Search Bar */}
      <div className="mt-4 flex items-center gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by item name or date..."
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-gradient-gold/30"
          />
        </div>
      </div>

      {/* Sales Table */}
      <div className="mt-4 flex-1 min-h-0 overflow-hidden flex flex-col">
        <SalesTable />
      </div>
    </DashboardLayout>
  );
}
