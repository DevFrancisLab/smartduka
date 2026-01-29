import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AddStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStock: (stock: StockData) => void;
}

export interface StockData {
  itemName: string;
  quantity: number;
  costPerUnit: number;
  totalCost: number;
  category: string;
  datePurchased: string;
}

const STOCK_CATEGORIES = [
  'Grains',
  'Beverages',
  'Dairy',
  'Oils & Fats',
  'Spices',
  'Baked Goods',
  'Supplies',
  'Other',
];

export default function AddStockModal({ isOpen, onClose, onAddStock }: AddStockModalProps) {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [costPerUnit, setCostPerUnit] = useState('');
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const calculateTotal = (qty: number, cost: number) => {
    return qty * cost;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Validation
    if (!itemName.trim()) newErrors.itemName = 'Item name is required';
    if (!quantity || parseInt(quantity) <= 0) newErrors.quantity = 'Quantity must be greater than 0';
    if (!costPerUnit || parseFloat(costPerUnit) <= 0) newErrors.costPerUnit = 'Cost must be greater than 0';
    if (!category) newErrors.category = 'Category is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const qty = parseInt(quantity);
    const cost = parseFloat(costPerUnit);
    const total = calculateTotal(qty, cost);
    const today = new Date().toISOString().split('T')[0];
    const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://127.0.0.1:8000';

    fetch(`${API_BASE}/api/stock/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        item_name: itemName,
        quantity: qty,
        cost_per_unit: cost,
        total_cost: total,
        category,
        date_purchased: today,
      }),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed to save stock item');
        const data = await res.json();
        onAddStock({
          itemName: data.item_name || itemName,
          quantity: data.quantity || qty,
          costPerUnit: data.cost_per_unit || cost,
          totalCost: data.total_cost || total,
          category: data.category || category,
          datePurchased: data.date_purchased || today,
        });
      })
      .catch(() => {
        onAddStock({
          itemName,
          quantity: qty,
          costPerUnit: cost,
          totalCost: total,
          category,
          datePurchased: today,
        });
      });

    // Reset form
    setItemName('');
    setQuantity('');
    setCostPerUnit('');
    setCategory('');
    setErrors({});
    onClose();
  };

  const handleClose = () => {
    setItemName('');
    setQuantity('');
    setCostPerUnit('');
    setCategory('');
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Add Procurement</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Record a new stock purchase for your shop
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Item Name */}
          <div className="space-y-2">
            <Label htmlFor="itemName" className="text-foreground">
              Item Name
            </Label>
            <Input
              id="itemName"
              placeholder="e.g., Rice 50kg, Maize Flour, Cooking Oil"
              value={itemName}
              onChange={(e) => {
                setItemName(e.target.value);
                if (errors.itemName) setErrors({ ...errors, itemName: '' });
              }}
              className="bg-muted text-foreground border-border placeholder-muted-foreground focus:ring-gradient-gold/30"
            />
            {errors.itemName && <p className="text-xs text-destructive">{errors.itemName}</p>}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-foreground">
              Category
            </Label>
            <select
              id="category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                if (errors.category) setErrors({ ...errors, category: '' });
              }}
              className="w-full px-3 py-2 bg-muted text-foreground border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-gradient-gold/30"
            >
              <option value="">Select category...</option>
              {STOCK_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && <p className="text-xs text-destructive">{errors.category}</p>}
          </div>

          {/* Quantity */}
          <div className="space-y-2">
            <Label htmlFor="quantity" className="text-foreground">
              Quantity (units)
            </Label>
            <Input
              id="quantity"
              type="number"
              placeholder="e.g., 50"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
                if (errors.quantity) setErrors({ ...errors, quantity: '' });
              }}
              className="bg-muted text-foreground border-border placeholder-muted-foreground focus:ring-gradient-gold/30"
            />
            {errors.quantity && <p className="text-xs text-destructive">{errors.quantity}</p>}
          </div>

          {/* Cost Per Unit */}
          <div className="space-y-2">
            <Label htmlFor="costPerUnit" className="text-foreground">
              Cost per Unit (Ksh)
            </Label>
            <Input
              id="costPerUnit"
              type="number"
              placeholder="e.g., 1500"
              value={costPerUnit}
              onChange={(e) => {
                setCostPerUnit(e.target.value);
                if (errors.costPerUnit) setErrors({ ...errors, costPerUnit: '' });
              }}
              className="bg-muted text-foreground border-border placeholder-muted-foreground focus:ring-gradient-gold/30"
            />
            {errors.costPerUnit && <p className="text-xs text-destructive">{errors.costPerUnit}</p>}
          </div>

          {/* Total Cost (auto-calculated) */}
          {quantity && costPerUnit && (
            <div className="p-3 bg-gradient-gold/10 border border-gradient-gold/20 rounded-lg">
              <p className="text-xs text-muted-foreground">Total Cost</p>
              <p className="text-xl font-bold text-gradient-gold">
                Ksh {calculateTotal(parseInt(quantity), parseFloat(costPerUnit)).toLocaleString()}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1 border-border text-foreground hover:bg-muted-foreground/5"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 gradient-gold text-primary-foreground hover:opacity-90 font-semibold"
            >
              Add Stock
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
