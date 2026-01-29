import React from "react";
import { Plus, Minus, Package, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuickActionsProps {
  onAddSale?: () => void;
  onAddExpense?: () => void;
  onAddStock?: () => void;
  onUpdateCashFloat?: () => void;
}

export default function QuickActions({
  onAddSale,
  onAddExpense,
  onAddStock,
  onUpdateCashFloat,
}: QuickActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 mt-4">
      {/* Add Sale - Primary Action */}
      <Button
        onClick={onAddSale}
        className="flex-1 gradient-gold text-primary-foreground hover:opacity-90 transition-all duration-300 py-3 px-3 rounded-lg font-semibold shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm"
      >
        <Plus className="w-5 h-5" />
        <span>Add Sale</span>
      </Button>

      {/* Add Expense */}
      <Button
        onClick={onAddExpense}
        className="flex-1 bg-card border border-border text-foreground hover:bg-muted-foreground/5 transition-all duration-300 py-3 px-3 rounded-lg font-semibold shadow-sm flex items-center justify-center gap-2 text-sm"
      >
        <Minus className="w-5 h-5" />
        <span>Add Expense</span>
      </Button>

      {/* Add Stock */}
      <Button
        onClick={onAddStock}
        className="flex-1 bg-card border border-border text-foreground hover:bg-muted-foreground/5 transition-all duration-300 py-5 px-4 rounded-lg font-semibold shadow-sm flex items-center justify-center gap-2"
      >
        <Package className="w-5 h-5" />
        <span>Add Stock</span>
      </Button>

      {/* Update Cash Float */}
      <Button
        onClick={onUpdateCashFloat}
        className="flex-1 bg-card border border-border text-foreground hover:bg-muted-foreground/5 transition-all duration-300 py-5 px-4 rounded-lg font-semibold shadow-sm flex items-center justify-center gap-2"
      >
        <DollarSign className="w-5 h-5" />
        <span>Update Float</span>
      </Button>
    </div>
  );
}
