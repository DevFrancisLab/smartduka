import { ChevronRight } from 'lucide-react';

interface StockRecord {
  id: string;
  itemName: string;
  quantityRemaining: number;
  totalCost: number;
  datePurchased: string;
  expectedProfit?: number;
  category?: string;
}

const StockTable = () => {
  const stock: StockRecord[] = [
    { id: '1', itemName: 'Rice – 50kg bag', quantityRemaining: 6, totalCost: 15000, datePurchased: '2026-01-10', expectedProfit: 2000, category: 'rice' },
    { id: '2', itemName: 'Maize Flour – 10kg', quantityRemaining: 10, totalCost: 6000, datePurchased: '2026-01-12', expectedProfit: 900, category: 'flour' },
    { id: '3', itemName: 'Sugar – 25kg', quantityRemaining: 3, totalCost: 7000, datePurchased: '2026-01-08', expectedProfit: 1100, category: 'sugar' },
    { id: '4', itemName: 'Cooking Oil – 20L', quantityRemaining: 8, totalCost: 9600, datePurchased: '2026-01-14', expectedProfit: 800, category: 'oil' },
    { id: '5', itemName: 'Beans – 50kg', quantityRemaining: 2, totalCost: 14000, datePurchased: '2026-01-05', expectedProfit: 1800, category: 'beans' },
    { id: '6', itemName: 'Salt – 25kg', quantityRemaining: 15, totalCost: 2250, datePurchased: '2026-01-16', expectedProfit: 300, category: 'salt' },
    { id: '7', itemName: 'Tea Leaves – 5kg', quantityRemaining: 4, totalCost: 4000, datePurchased: '2026-01-11', expectedProfit: 500, category: 'tea' },
    { id: '8', itemName: 'Bread – 100pcs box', quantityRemaining: 20, totalCost: 3500, datePurchased: '2026-01-17', expectedProfit: 400, category: 'bakery' },
    { id: '9', itemName: 'Eggs – 30 dozen', quantityRemaining: 5, totalCost: 4500, datePurchased: '2026-01-09', expectedProfit: 600, category: 'eggs' },
    { id: '10', itemName: 'Bags & Tape', quantityRemaining: 40, totalCost: 1200, datePurchased: '2026-01-15', expectedProfit: 0, category: 'supplies' },
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden flex flex-col h-full">
      {/* Table Header */}
      <div className="hidden md:grid md:grid-cols-5 gap-4 px-4 py-3 border-b border-border bg-muted-foreground/3 font-semibold text-sm text-foreground sticky top-0">
        <div>Item Name</div>
        <div className="text-right">Quantity</div>
        <div className="text-right">Total Cost</div>
        <div className="text-right">Date Purchased</div>
        <div className="text-right">Expected Profit</div>
      </div>

      {/* Table Body - Scrollable */}
      <div className="overflow-y-auto flex-1">
        {stock.map((s, idx) => (
          <div
            key={s.id}
            className={`px-4 py-3 border-b border-border last:border-b-0 hover:bg-muted-foreground/5 transition-colors cursor-pointer ${
              idx % 2 === 0 ? 'bg-muted-foreground/2' : ''
            }`}
          >
            {/* Mobile View */}
            <div className="md:hidden space-y-2">
              <div className="flex items-start justify-between">
                <p className="text-sm font-medium text-foreground flex-1 pr-2">{s.itemName}</p>
                <ChevronRight className="w-4 h-4 text-muted-foreground/50 flex-shrink-0 mt-0.5" />
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <p className="text-muted-foreground">Qty</p>
                  <p className={`font-semibold ${s.quantityRemaining <= 2 ? 'text-destructive' : 'text-foreground'}`}>{s.quantityRemaining}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Cost</p>
                  <p className="font-semibold text-gradient-gold">Ksh {s.totalCost}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Profit</p>
                  <p className="font-semibold text-foreground">Ksh {s.expectedProfit}</p>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">{s.datePurchased}</p>
            </div>

            {/* Desktop View */}
            <div className="hidden md:grid md:grid-cols-5 gap-4 items-center text-sm">
              <div className="font-medium text-foreground flex items-center gap-3">
                {/* optional small icon placeholder */}
                <span className="inline-block w-6 h-6 rounded bg-muted-foreground/10 flex items-center justify-center text-xs text-muted-foreground">{s.category?.[0]?.toUpperCase()}</span>
                <span>{s.itemName}</span>
              </div>
              <div className={`text-right font-semibold ${s.quantityRemaining <= 2 ? 'text-destructive' : 'text-foreground'}`}>{s.quantityRemaining}</div>
              <div className="text-right text-gradient-gold">Ksh {s.totalCost}</div>
              <div className="text-right text-muted-foreground">{s.datePurchased}</div>
              <div className="text-right text-foreground">Ksh {s.expectedProfit}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-border bg-muted-foreground/3">
        <button className="w-full text-center text-sm text-gradient-gold hover:text-gradient-gold/80 transition-colors font-medium">
          Load More Items →
        </button>
      </div>
    </div>
  );
};

export default StockTable;
