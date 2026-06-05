'use client';

import { ReactNode } from 'react';

interface MessageBubbleProps {
  role: 'user' | 'agent';
  children: ReactNode;
  timestamp?: string;
  header?: ReactNode;
}

export default function MessageBubble({ role, children, timestamp, header }: MessageBubbleProps) {
  return (
    <div className={`mobile-message-bubble ${role}`}>
      {header && <div className="flex items-center gap-2">{header}</div>}
      <div className="mobile-message-content">{children}</div>
      {timestamp && <span className="text-[11px] text-[var(--mobile-text-muted)]">{timestamp}</span>}
    </div>
  );
}
