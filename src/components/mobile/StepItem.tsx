'use client';

import { useState } from 'react';
import { ChevronRight, CheckCircle, Circle } from 'lucide-react';

interface StepItemProps {
  title: string;
  completed?: boolean;
  tools?: string[];
  description?: string;
}

export default function StepItem({ title, completed = false, tools = [], description }: StepItemProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mobile-step-item">
      <button
        onClick={() => setExpanded(!expanded)}
        className="mobile-step-header"
      >
        <div className="mobile-step-icon">
          {completed ? (
            <CheckCircle size={18} color="var(--mobile-green)" strokeWidth={1.5} />
          ) : (
            <Circle size={18} color="var(--mobile-text-secondary)" strokeWidth={1.5} />
          )}
        </div>
        <span className="flex-1 text-left font-medium">{title}</span>
        <ChevronRight
          size={16}
          color="var(--mobile-text-muted)"
          style={{
            transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 200ms ease',
          }}
        />
      </button>

      {expanded && (
        <div className="space-y-2 pb-2">
          {tools.length > 0 && (
            <div className="mobile-step-chips">
              {tools.map((tool, i) => (
                <span key={i} className="mobile-chip">
                  {tool}
                </span>
              ))}
            </div>
          )}
          {description && (
            <p className="text-[13px] text-[var(--mobile-text-secondary)] leading-relaxed">
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
