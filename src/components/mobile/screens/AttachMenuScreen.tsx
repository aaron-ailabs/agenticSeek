'use client';

import { Camera, Paperclip, Monitor, Puzzle, Globe, Presentation, Image, Wand2, Telescope, Calendar, Table, Video, Waves, BookOpen, ExternalLink } from 'lucide-react';
import BottomSheet from '../BottomSheet';

interface AttachMenuScreenProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AttachMenuScreen({ isOpen, onClose }: AttachMenuScreenProps) {
  const actions = [
    { icon: Paperclip, label: 'Add files' },
    { icon: Monitor, label: 'Connect My Computer' },
    { icon: Puzzle, label: 'Add Skills' },
    { icon: Globe, label: 'Build website' },
    { icon: Presentation, label: 'Create slides', badge: 'GPT-4o' },
    { icon: Image, label: 'Create image' },
    { icon: Wand2, label: 'Edit image' },
    { icon: Telescope, label: 'Wide Research' },
    { icon: Calendar, label: 'Scheduled tasks' },
    { icon: Table, label: 'Create spreadsheet' },
    { icon: Video, label: 'Create video' },
    { icon: Waves, label: 'Generate audio' },
  ];

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      {/* Photo Row */}
      <div className="px-4 py-4 flex gap-3 overflow-x-auto pb-4">
        <button className="w-20 h-20 rounded-xl bg-[var(--mobile-surface)] flex flex-col items-center justify-center gap-1 flex-shrink-0">
          <Camera size={20} color="var(--mobile-text-secondary)" strokeWidth={1.5} />
          <span className="text-[10px] text-[var(--mobile-text-secondary)]">Camera</span>
        </button>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-20 h-20 rounded-xl flex-shrink-0 relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, hsl(${i * 60}, 70%, 60%), hsl(${i * 60 + 30}, 70%, 50%))`,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full border-2 border-white" />
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px bg-[var(--mobile-border)]" />

      {/* Action List */}
      <div className="divide-y divide-[var(--mobile-border)]">
        {actions.map((action, i) => {
          const Icon = action.icon;
          return (
            <button
              key={i}
              className="w-full px-4 py-3 flex items-center gap-3 h-13 hover:bg-[var(--mobile-surface)] transition-colors"
            >
              <Icon size={20} color="var(--mobile-text-secondary)" strokeWidth={1.5} />
              <span className="flex-1 text-left text-[15px] text-[var(--mobile-text-primary)] font-medium">
                {action.label}
              </span>
              {action.badge && (
                <span className="text-[11px] font-mono px-2 py-1 rounded-full bg-[var(--mobile-surface-raised)] text-[var(--mobile-text-secondary)]">
                  {action.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Pinned Bottom Row */}
      <div className="px-4 py-3 border-t border-[var(--mobile-border)] flex items-center gap-3 h-13">
        <BookOpen size={20} color="var(--mobile-text-secondary)" strokeWidth={1.5} />
        <span className="flex-1 text-[15px] text-[var(--mobile-text-primary)] font-medium">Playbook</span>
        <ExternalLink size={16} color="var(--mobile-accent)" strokeWidth={1.5} />
      </div>
    </BottomSheet>
  );
}
