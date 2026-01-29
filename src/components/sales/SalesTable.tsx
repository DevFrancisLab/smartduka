import { ChevronRight } from 'lucide-react';

interface SaleRecord {
  id: string;
  itemName: string;
  quantity: number;
  pricePerUnit: number;
  total: number;
  time: string;
}

const SalesTable = () => {
  // Demo data: 10 recent sales
  const sales: SaleRecord[] = [
    {
      id: '1',
      itemName: 'Rice – 1kg',
      quantity: 3,
      pricePerUnit: 500,
      total: 1500,
      time: '02:45 PM',
    },
    {
      id: '2',
      itemName: 'Sugar – 500g',
      quantity: 2,
      pricePerUnit: 300,
      total: 600,
      time: '02:30 PM',
    },
    {
      id: '3',
      itemName: 'Cooking Oil – 1L',
      quantity: 1,
      pricePerUnit: 1200,
      total: 1200,
      time: '02:15 PM',
    },
    {
      id: '4',
      itemName: 'Beans – 2kg',
      quantity: 2,
      pricePerUnit: 400,
      total: 800,
      time: '01:50 PM',
    },
    {
      id: '5',
      itemName: 'Maize Flour – 2kg',
      quantity: 4,
      pricePerUnit: 600,
      total: 2400,
      time: '01:30 PM',
    },
    {
      id: '6',
      itemName: 'Milk – 1L',
      quantity: 5,
      pricePerUnit: 250,
      total: 1250,
      time: '01:10 PM',
    },
    {
      id: '7',
      itemName: 'Bread – Loaf',
      quantity: 6,
      pricePerUnit: 350,
      total: 2100,
      time: '12:45 PM',
    },
    {
      id: '8',
      itemName: 'Tea Leaves – 100g',
      quantity: 3,
      pricePerUnit: 200,
      total: 600,
      time: '12:20 PM',
    },
    {
      id: '9',
      itemName: 'Eggs – 1 dozen',
      quantity: 2,
      pricePerUnit: 450,
      total: 900,
      time: '11:55 AM',
    },
    {
      id: '10',
      itemName: 'Salt – 1kg',
      quantity: 1,
      pricePerUnit: 150,
      total: 150,
      time: '11:30 AM',
    },
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden flex flex-col h-full">
      {/* Table Header */}
      <div className="hidden md:grid md:grid-cols-5 gap-4 px-4 py-3 border-b border-border bg-muted-foreground/3 font-semibold text-sm text-foreground sticky top-0">
        <div>Item Name</div>
        <div className="text-right">Quantity</div>
        <div className="text-right">Price/Unit</div>
        <div className="text-right">Total (Ksh)</div>
        <div className="text-right">Time</div>
      </div>

      {/* Table Body - Scrollable */}
      <div className="overflow-y-auto flex-1">
        {sales.map((sale, idx) => (
          <div
            key={sale.id}
            className={`px-4 py-3 border-b border-border last:border-b-0 hover:bg-muted-foreground/5 transition-colors cursor-pointer ${
              idx % 2 === 0 ? 'bg-muted-foreground/2' : ''
            }`}
          >
            {/* Mobile View */}
            <div className="md:hidden space-y-2">
              <div className="flex items-start justify-between">
                <p className="text-sm font-medium text-foreground flex-1 pr-2">
                  {sale.itemName}
                </p>
                <ChevronRight className="w-4 h-4 text-muted-foreground/50 flex-shrink-0 mt-0.5" />
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <p className="text-muted-foreground">Qty</p>
                  <p className="font-semibold text-foreground">{sale.quantity}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Price</p>
                  <p className="font-semibold text-foreground">Ksh {sale.pricePerUnit}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Total</p>
                  <p className="font-semibold text-gradient-gold">Ksh {sale.total}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{sale.time}</p>
            </div>

            {/* Desktop View */}
            <div className="hidden md:grid md:grid-cols-5 gap-4 items-center text-sm">
              <div className="font-medium text-foreground">{sale.itemName}</div>
              <div className="text-right text-foreground font-medium">
                {sale.quantity}
              </div>
              <div className="text-right text-foreground">Ksh {sale.pricePerUnit}</div>
              <div className="text-right font-semibold text-gradient-gold">
                Ksh {sale.total}
              </div>
              <div className="text-right text-muted-foreground flex items-center justify-end gap-2">
                <span>{sale.time}</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-border bg-muted-foreground/3">
        <button className="w-full text-center text-sm text-gradient-gold hover:text-gradient-gold/80 transition-colors font-medium">
          Load More Sales →
        </button>
      </div>
    </div>
  );
};

export default SalesTable;
