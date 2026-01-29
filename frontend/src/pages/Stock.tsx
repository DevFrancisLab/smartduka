import { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import StockHeader from '@/components/stock/StockHeader';
import StockInsights from '@/components/stock/StockInsights';
import StockTable from '@/components/stock/StockTable';
import AddStockModal, { StockData } from '@/components/stock/AddStockModal';

export default function Stock() {
  const [isAddStockOpen, setIsAddStockOpen] = useState(false);
  const [stockData, setStockData] = useState<StockData[]>([]);

  const handleAddStock = (stock: StockData) => {
    setStockData([stock, ...stockData]);
    console.log('Stock added:', stock);
  };

  const handleSearch = (q: string) => {
    console.log('Search stock:', q);
  };

  return (
    <DashboardLayout active="stock">
      <StockHeader />

      <StockInsights />

      <div className="mt-4">
        <Button
          onClick={() => setIsAddStockOpen(true)}
          className="gradient-gold text-primary-foreground hover:opacity-90 transition-all duration-300 font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          <Plus className="w-5 h-5" />
          <span>Add Procurement</span>
        </Button>
      </div>

      {/* Search Bar */}
      <div className="mt-4 flex items-center gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by item or date..."
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-gradient-gold/30"
          />
        </div>
      </div>

      {/* Stock Table */}
      <div className="mt-4 flex-1 min-h-0 overflow-hidden flex flex-col">
        <StockTable />
      </div>

      {/* Add Stock Modal */}
      <AddStockModal
        isOpen={isAddStockOpen}
        onClose={() => setIsAddStockOpen(false)}
        onAddStock={handleAddStock}
      />
    </DashboardLayout>
  );
}
