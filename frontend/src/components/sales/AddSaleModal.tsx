import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';

interface AddSaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSale: (sale: SaleData) => void;
}

export interface SaleData {
  itemName: string;
  quantity: number;
  pricePerUnit: number;
  total: number;
}

export default function AddSaleModal({ isOpen, onClose, onAddSale }: AddSaleModalProps) {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [pricePerUnit, setPricePerUnit] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const calculateTotal = (qty: number, price: number) => {
    return qty * price;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Validation
    if (!itemName.trim()) newErrors.itemName = 'Item name is required';
    if (!quantity || parseInt(quantity) <= 0) newErrors.quantity = 'Quantity must be greater than 0';
    if (!pricePerUnit || parseFloat(pricePerUnit) <= 0) newErrors.pricePerUnit = 'Price must be greater than 0';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const qty = parseInt(quantity);
    const price = parseFloat(pricePerUnit);
    const total = calculateTotal(qty, price);

    const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://127.0.0.1:8000';

    // Try to persist to backend; fall back to local callback if network fails
    fetch(`${API_BASE}/api/sales/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        item_name: itemName,
        quantity: qty,
        price_per_unit: price,
        total,
      }),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed to save sale');
        const data = await res.json();
        onAddSale({
          itemName: data.item_name || itemName,
          quantity: data.quantity || qty,
          pricePerUnit: data.price_per_unit || price,
          total: data.total || total,
        });
      })
      .catch(() => {
        // offline / error: still call the callback so UI updates
        onAddSale({
          itemName,
          quantity: qty,
          pricePerUnit: price,
          total,
        });
      });

    // Reset form
    setItemName('');
    setQuantity('');
    setPricePerUnit('');
    setErrors({});
    onClose();
  };

  const handleClose = () => {
    setItemName('');
    setQuantity('');
    setPricePerUnit('');
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Add New Sale</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Enter the item details to record a new sale
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
              placeholder="e.g., Rice, Sugar, Milk"
              value={itemName}
              onChange={(e) => {
                setItemName(e.target.value);
                if (errors.itemName) setErrors({ ...errors, itemName: '' });
              }}
              className="bg-muted text-foreground border-border placeholder-muted-foreground focus:ring-gradient-gold/30"
            />
            {errors.itemName && <p className="text-xs text-destructive">{errors.itemName}</p>}
          </div>

          {/* Quantity */}
          <div className="space-y-2">
            <Label htmlFor="quantity" className="text-foreground">
              Quantity
            </Label>
            <Input
              id="quantity"
              type="number"
              placeholder="e.g., 5"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
                if (errors.quantity) setErrors({ ...errors, quantity: '' });
              }}
              className="bg-muted text-foreground border-border placeholder-muted-foreground focus:ring-gradient-gold/30"
            />
            {errors.quantity && <p className="text-xs text-destructive">{errors.quantity}</p>}
          </div>

          {/* Price Per Unit */}
          <div className="space-y-2">
            <Label htmlFor="pricePerUnit" className="text-foreground">
              Price per Unit (Ksh)
            </Label>
            <Input
              id="pricePerUnit"
              type="number"
              placeholder="e.g., 2500"
              value={pricePerUnit}
              onChange={(e) => {
                setPricePerUnit(e.target.value);
                if (errors.pricePerUnit) setErrors({ ...errors, pricePerUnit: '' });
              }}
              className="bg-muted text-foreground border-border placeholder-muted-foreground focus:ring-gradient-gold/30"
            />
            {errors.pricePerUnit && <p className="text-xs text-destructive">{errors.pricePerUnit}</p>}
          </div>

          {/* Total (auto-calculated) */}
          {quantity && pricePerUnit && (
            <div className="p-3 bg-gradient-gold/10 border border-gradient-gold/20 rounded-lg">
              <p className="text-xs text-muted-foreground">Total Amount</p>
              <p className="text-xl font-bold text-gradient-gold">
                Ksh {calculateTotal(parseInt(quantity), parseFloat(pricePerUnit)).toLocaleString()}
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
              Add Sale
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
