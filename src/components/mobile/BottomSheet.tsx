'use client';

import { ReactNode } from 'react';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function BottomSheet({ isOpen, onClose, children }: BottomSheetProps) {
  return (
    <div
      className={`mobile-bottom-sheet ${isOpen ? 'active' : ''}`}
      onClick={onClose}
    >
      <div
        className="mobile-sheet-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mobile-sheet-handle" />
        {children}
      </div>
    </div>
  );
}
