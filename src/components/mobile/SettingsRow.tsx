'use client';

import { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';

interface SettingsRowProps {
  icon: ReactNode;
  label: string;
  value?: string;
  children?: ReactNode;
  onTap?: () => void;
}

export default function SettingsRow({ icon, label, value, children, onTap }: SettingsRowProps) {
  return (
    <button onClick={onTap} className="mobile-settings-row w-full">
      <div className="mobile-settings-icon">
        {icon}
      </div>
      <span className="mobile-settings-label">{label}</span>
      {children || (
        <>
          {value && <span className="mobile-settings-value">{value}</span>}
          <ChevronRight size={16} color="var(--mobile-text-muted)" strokeWidth={1.5} />
        </>
      )}
    </button>
  );
}
