'use client';

import { MessageSquare, ListTodo, Monitor, Plus, Settings } from 'lucide-react';
import { MobileScreen } from './MobileViewport';

interface TabBarProps {
  activeScreen: MobileScreen;
  onScreenChange: (screen: MobileScreen) => void;
}

const tabs: { id: MobileScreen; icon: any; label: string }[] = [
  { id: 'chat', icon: MessageSquare, label: 'Chat' },
  { id: 'tasks', icon: ListTodo, label: 'Tasks' },
  { id: 'computer', icon: Monitor, label: 'Computer' },
  { id: 'attach', icon: Plus, label: 'Attach' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

export default function TabBar({ activeScreen, onScreenChange }: TabBarProps) {
  return (
    <nav className="mobile-tab-bar">
      {tabs.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => onScreenChange(id)}
          className={`mobile-tab ${activeScreen === id ? 'active' : ''}`}
        >
          <Icon className="mobile-tab-icon" size={20} strokeWidth={1.5} />
          <span className="mobile-tab-label">{label}</span>
        </button>
      ))}
    </nav>
  );
}
