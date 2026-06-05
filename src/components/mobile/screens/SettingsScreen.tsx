'use client';

import { useState } from 'react';
import { ChevronLeft, Bell, Star, Share2, User, Clock, Lightbulb, Mail, Shield, Monitor, Puzzle, Plug, Zap, Globe, Moon } from 'lucide-react';
import SettingsRow from '../SettingsRow';

export default function SettingsScreen() {
  const [appearance, setAppearance] = useState<'light' | 'dark' | 'system'>('dark');

  return (
    <div className="mobile-screen absolute inset-0 flex flex-col">
      {/* Top Bar */}
      <div className="mobile-topbar flex justify-between items-center">
        <button className="p-2 -ml-2">
          <ChevronLeft size={20} color="var(--mobile-text-secondary)" strokeWidth={1.5} />
        </button>
        <span className="font-semibold text-[15px] text-[var(--mobile-text-primary)]">Settings</span>
        <button className="p-2 -mr-2 relative">
          <Bell size={20} color="var(--mobile-text-secondary)" strokeWidth={1.5} />
          <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[var(--mobile-destructive)]" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="mobile-scrollable mobile-tab-bar-bottom px-4">
        {/* Section 1: Credits */}
        <div className="mt-4 bg-[var(--mobile-surface)] rounded-xl overflow-hidden">
          <SettingsRow
            icon={<Star size={20} />}
            label="Credits"
            value="0"
          />
        </div>

        {/* Section 2: Share */}
        <div className="mt-4 bg-[var(--mobile-surface)] rounded-xl overflow-hidden">
          <SettingsRow
            icon={<Share2 size={20} />}
            label="Share with a friend"
          />
        </div>

        {/* Section 3: Account & Settings */}
        <div className="mt-4 bg-[var(--mobile-surface)] rounded-xl overflow-hidden">
          <SettingsRow icon={<User size={20} />} label="Account" />
          <SettingsRow icon={<Clock size={20} />} label="Scheduled tasks" />
          <SettingsRow icon={<Lightbulb size={20} />} label="Knowledge" />
          <SettingsRow icon={<Mail size={20} />} label="Mail Velocity" />
          <SettingsRow icon={<Shield size={20} />} label="Data controls" />
          <SettingsRow icon={<Monitor size={20} />} label="Cloud Browser" />
          <SettingsRow icon={<Puzzle size={20} />} label="Skills" />
          <SettingsRow icon={<Plug size={20} />} label="Connectors" />
          <SettingsRow icon={<Zap size={20} />} label="Integrations" />
        </div>

        {/* Section 4: Language & Appearance */}
        <div className="mt-4 bg-[var(--mobile-surface)] rounded-xl overflow-hidden mb-6">
          <SettingsRow
            icon={<Globe size={20} />}
            label="Language"
            value="English"
          />
          <SettingsRow
            icon={<Moon size={20} />}
            label="Appearance"
            children={
              <div className="flex gap-2 items-center">
                {(['light', 'dark', 'system'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setAppearance(mode)}
                    className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-colors ${
                      appearance === mode
                        ? 'bg-[var(--mobile-text-primary)] text-[var(--mobile-bg)]'
                        : 'bg-[var(--mobile-surface-raised)] text-[var(--mobile-text-secondary)]'
                    }`}
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                ))}
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
}
