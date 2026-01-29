import React, { Suspense } from 'react';
import type { Debt } from './DebtsTable';

const EditDebtModal = React.lazy(() => import('./EditDebtModal'));

interface WrapperProps {
  debt: Debt;
  open: boolean;
  onClose: () => void;
  onUpdateDebt: (d: Debt) => void;
}

export default function EditDebtModalWrapper({ debt, open, onClose, onUpdateDebt }: WrapperProps) {
  return (
    <Suspense fallback={null}>
      <EditDebtModal isOpen={open} onClose={onClose} debt={debt} onUpdateDebt={onUpdateDebt} />
    </Suspense>
  );
}
