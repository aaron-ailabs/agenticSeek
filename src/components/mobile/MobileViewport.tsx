'use client';

import { ReactNode, useState } from 'react';
import TabBar from './TabBar';

export type MobileScreen = 'chat' | 'tasks' | 'computer' | 'attach' | 'settings';

interface MobileViewportProps {
  children: ReactNode;
}

export default function MobileViewport({ children }: MobileViewportProps) {
  const [activeScreen, setActiveScreen] = useState<MobileScreen>('chat');
  const [attachOpen, setAttachOpen] = useState(false);

  return (
    <div className="mobile-viewport mx-auto flex flex-col relative">
      {/* Screen Container */}
      <div className="relative flex-1 overflow-hidden">
        {children}
      </div>

      {/* Tab Bar */}
      <TabBar activeScreen={activeScreen} onScreenChange={setActiveScreen} />
    </div>
  );
}
