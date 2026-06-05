'use client';

import { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';

interface TaskRowProps {
  icon: ReactNode;
  title: string;
  onTap?: () => void;
}

export default function TaskRow({ icon, title, onTap }: TaskRowProps) {
  return (
    <button
      onClick={onTap}
      className="mobile-task-row w-full"
    >
      <div className="mobile-task-icon">
        {icon}
      </div>
      <span className="mobile-task-title">{title}</span>
      <ChevronRight size={16} color="var(--mobile-text-muted)" strokeWidth={1.5} />
    </button>
  );
}
