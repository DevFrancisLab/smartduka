import DashboardLayout from '@/layouts/DashboardLayout';
import CashHeader from '@/components/cash/CashHeader';
import CashFloatCard from '@/components/cash/CashFloatCard';
import CashInsights from '@/components/cash/CashInsights';
import CashHistory from '@/components/cash/CashHistory';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function CashFloat() {
  const handleUpdate = () => {
    console.log('Open Add/Update Cash Float modal');
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
              onClick={handleUpdate}
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
    </DashboardLayout>
  );
}
