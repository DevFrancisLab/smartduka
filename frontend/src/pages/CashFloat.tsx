import { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import CashHeader from '@/components/cash/CashHeader';
import CashFloatCard from '@/components/cash/CashFloatCard';
import CashInsights from '@/components/cash/CashInsights';
import CashHistory from '@/components/cash/CashHistory';
import UpdateCashFloatModal, { CashFloatTransaction } from '@/components/cash/UpdateCashFloatModal';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function CashFloat() {
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [currentFloat, setCurrentFloat] = useState(2500);
  const [transactions, setTransactions] = useState<CashFloatTransaction[]>([]);

  const handleUpdateCashFloat = (transaction: CashFloatTransaction) => {
    // Update current float
    const newFloat =
      currentFloat + (transaction.action === 'add' ? transaction.amount : -transaction.amount);
    setCurrentFloat(newFloat);
    
    // Add to transaction history
    setTransactions([transaction, ...transactions]);
    console.log('Cash float updated:', transaction);
  };

  return (
    <DashboardLayout active="cashfloat">
      <CashHeader />

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <CashFloatCard />
          <div className="mt-3">
            <CashInsights />
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="flex items-start justify-end md:justify-center">
            <Button
              onClick={() => setIsUpdateOpen(true)}
              className="gradient-gold text-primary-foreground hover:opacity-90 transition-all duration-300 font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg flex items-center gap-2 w-full md:w-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Update Cash Float</span>
            </Button>
          </div>
        </div>
      </div>

      {/* History list */}
      <div className="mt-4">
        <CashHistory />
      </div>

      {/* Update Cash Float Modal */}
      <UpdateCashFloatModal
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        onUpdateCashFloat={handleUpdateCashFloat}
        currentFloat={currentFloat}
      />
    </DashboardLayout>
  );
}
