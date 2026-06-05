'use client';

import { useState } from 'react';
import ChatScreen from '@/components/mobile/screens/ChatScreen';
import TasksScreen from '@/components/mobile/screens/TasksScreen';
import ComputerUseScreen from '@/components/mobile/screens/ComputerUseScreen';
import AttachMenuScreen from '@/components/mobile/screens/AttachMenuScreen';
import SettingsScreen from '@/components/mobile/screens/SettingsScreen';
import TabBar from '@/components/mobile/TabBar';

type MobileScreen = 'chat' | 'tasks' | 'computer' | 'attach' | 'settings';

export default function MobilePage() {
  const [activeScreen, setActiveScreen] = useState<MobileScreen>('chat');
  const [attachOpen, setAttachOpen] = useState(false);

  // Handle attach tab by opening sheet instead of navigating
  const handleScreenChange = (screen: MobileScreen) => {
    if (screen === 'attach') {
      setAttachOpen(true);
    } else {
      setActiveScreen(screen);
      setAttachOpen(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--mobile-bg)] p-4">
      <div className="mobile-viewport relative bg-[var(--mobile-bg)]">
        {/* Chat Screen */}
        <div className={`mobile-screen ${activeScreen === 'chat' ? 'active' : ''}`}>
          <ChatScreen />
        </div>

        {/* Tasks Screen */}
        <div className={`mobile-screen ${activeScreen === 'tasks' ? 'active' : ''}`}>
          <TasksScreen />
        </div>

        {/* Computer Use Screen */}
        <div className={`mobile-screen ${activeScreen === 'computer' ? 'active' : ''}`}>
          <ComputerUseScreen />
        </div>

        {/* Settings Screen */}
        <div className={`mobile-screen ${activeScreen === 'settings' ? 'active' : ''}`}>
          <SettingsScreen />
        </div>

        {/* Attach Menu (Bottom Sheet) */}
        <AttachMenuScreen isOpen={attachOpen} onClose={() => setAttachOpen(false)} />

        {/* Tab Bar */}
        <TabBar activeScreen={activeScreen} onScreenChange={handleScreenChange} />
      </div>
    </div>
  );
}
