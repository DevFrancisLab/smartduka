import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

interface DateRangeSelectorProps {
  selectedRange: string;
  onRangeChange: (range: string) => void;
}

export default function DateRangeSelector({ selectedRange, onRangeChange }: DateRangeSelectorProps) {
  const ranges = [
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'custom', label: 'Custom' },
  ];

  return (
    <div className="mb-6 flex flex-wrap gap-2 sm:gap-3">
      {ranges.map((range) => (
        <Button
          key={range.id}
          variant={selectedRange === range.id ? 'default' : 'outline'}
          size="sm"
          onClick={() => onRangeChange(range.id)}
          className={
            selectedRange === range.id
              ? 'bg-gradient-gold hover:bg-gradient-gold/90 text-gray-900 font-semibold'
              : 'border-border text-muted-foreground hover:text-foreground'
          }
        >
          {range.id === 'custom' && <Calendar className="w-4 h-4 mr-1" />}
          {range.label}
        </Button>
      ))}
    </div>
  );
}
