import React from "react";
import { ChevronRight } from "lucide-react";

interface Sale {
  id: string;
  item: string;
  amount: string;
  time: string;
}

interface RecentSalesProps {
  sales?: Sale[];
}

const defaultSales: Sale[] = [
  { id: "1", item: "Rice – 1kg", amount: "Ksh 500", time: "10:45 AM" },
  { id: "2", item: "Sugar – 500g", amount: "Ksh 300", time: "10:30 AM" },
  { id: "3", item: "Cooking Oil – 1L", amount: "Ksh 1,200", time: "09:55 AM" },
  { id: "4", item: "Beans – 2kg", amount: "Ksh 400", time: "09:15 AM" },
  { id: "5", item: "Maize Flour – 2kg", amount: "Ksh 600", time: "08:30 AM" },
];

export default function RecentSales({ sales = defaultSales }: RecentSalesProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-3 shadow-sm">
      {/* Header */}
      <h3 className="text-lg font-semibold text-foreground mb-4">Recent Sales</h3>

      {/* Sales List */}
      <div className="space-y-1">
        {sales.map((sale, idx) => (
          <div
            key={sale.id}
            className={`flex items-center justify-between p-2 rounded-lg transition-colors cursor-pointer hover:bg-muted-foreground/5 ${
              idx % 2 === 0 ? "bg-muted-foreground/2" : ""
            }`}
          >
            {/* Left: Item and Time */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {sale.item}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{sale.time}</p>
            </div>

            {/* Right: Amount and Chevron */}
            <div className="flex items-center gap-2 ml-3">
              <p className="text-sm font-semibold text-gradient-gold">
                {sale.amount}
              </p>
              <ChevronRight className="w-4 h-4 text-muted-foreground/50 flex-shrink-0" />
            </div>
          </div>
        ))}
      </div>

      {/* Footer: View All Link */}
      <div className="mt-4 pt-4 border-t border-border">
        <button className="w-full text-center text-sm text-gradient-gold hover:text-gradient-gold/80 transition-colors font-medium">
          View All Transactions
        </button>
      </div>
    </div>
  );
}
