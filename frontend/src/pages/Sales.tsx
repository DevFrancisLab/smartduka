import { useEffect, useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import SalesHeader from '@/components/sales/SalesHeader';
import SalesInsights from '@/components/sales/SalesInsights';
import SalesTable from '@/components/sales/SalesTable';
import AddSaleModal, { SaleData } from '@/components/sales/AddSaleModal';

export default function Sales() {
  const [isAddSaleOpen, setIsAddSaleOpen] = useState(false);
  const [salesData, setSalesData] = useState<SaleData[]>([]);

  // Load saved sales from backend on mount
  useEffect(() => {
    const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://127.0.0.1:8000';

    fetch(`${API_BASE}/api/sales/`)
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed to fetch sales');
        const data = await res.json();
        // Map backend fields to frontend SaleData shape
        const mapped: SaleData[] = (data || []).map((d: any) => ({
          itemName: d.item_name,
          quantity: Number(d.quantity),
          pricePerUnit: Number(d.price_per_unit),
          total: Number(d.total),
        }));
        setSalesData(mapped);
      })
      .catch((err) => {
        console.warn('Could not load saved sales:', err);
      });
  }, []);

  const handleAddSale = (sale: SaleData) => {
    setSalesData([...salesData, sale]);
    console.log('Sale added:', sale);
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
          onClick={() => setIsAddSaleOpen(true)}
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
        <SalesTable newSales={salesData} />
      </div>

      {/* Add Sale Modal */}
      <AddSaleModal
        isOpen={isAddSaleOpen}
        onClose={() => setIsAddSaleOpen(false)}
        onAddSale={handleAddSale}
      />
    </DashboardLayout>
  );
}
