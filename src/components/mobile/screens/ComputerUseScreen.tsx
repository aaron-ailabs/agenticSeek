'use client';

import { useState } from 'react';
import { X, Camera, Edit2, Circle, ChevronLeft, ChevronRight } from 'lucide-react';
import PreviewCard from '../PreviewCard';

export default function ComputerUseScreen() {
  const [progress, setProgress] = useState(30);
  const [isLive] = useState(true);

  const sampleContent = `# Project Setup Complete

## Installation
npx create-next-app@latest velocity \\
  --typescript \\
  --tailwind \\
  --eslint

## Dependencies Added
- @ui/components
- lucide-react
- typescript

## Next Steps
- Configure integrations
- Set up environment variables
- Deploy to production`;

  return (
    <div className="mobile-screen absolute inset-0 flex flex-col">
      {/* Top Bar */}
      <div className="mobile-topbar flex justify-between items-center">
        <button className="p-2 -ml-2">
          <X size={20} color="var(--mobile-text-secondary)" strokeWidth={2} />
        </button>
        <span className="font-semibold text-[15px] text-[var(--mobile-text-primary)]">Velocity's computer</span>
        <button className="p-2 -mr-2">
          <Camera size={20} color="var(--mobile-text-secondary)" strokeWidth={1.5} />
        </button>
      </div>

      {/* Preview Card */}
      <PreviewCard filename="task_output.md" content={sampleContent} />

      {/* Agent Status Row */}
      <div className="px-4 py-3 flex gap-3 border-t border-[var(--mobile-border)]">
        <div className="w-10 h-10 rounded-full bg-[var(--mobile-surface)] flex items-center justify-center flex-shrink-0">
          <Edit2 size={18} color="var(--mobile-text-secondary)" strokeWidth={1.5} />
        </div>
        <div className="flex-1">
          <div className="font-semibold text-[15px] text-[var(--mobile-text-primary)]">
            Velocity is using Editor
          </div>
          <div className="text-[13px] text-[var(--mobile-text-secondary)]">
            Creating file filename.md
          </div>
        </div>
      </div>

      {/* Timeline Scrubber */}
      <div className="px-4 py-3 flex gap-3 items-center">
        <div className="flex-1 h-0.5 rounded-full bg-[var(--mobile-border)] relative">
          <div
            className="h-full bg-[var(--mobile-text-primary)] rounded-full"
            style={{ width: `${progress}%` }}
          />
          <button
            className="absolute top-1/2 w-3.5 h-3.5 rounded-full bg-[var(--mobile-text-primary)] -translate-y-1/2"
            style={{ left: `${progress}%`, marginLeft: '-7px' }}
            onMouseDown={(e) => {
              const rect = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();
              const handleMouseMove = (moveEvent: MouseEvent) => {
                const newProgress = Math.max(0, Math.min(100, ((moveEvent.clientX - rect.left) / rect.width) * 100));
                setProgress(newProgress);
              };
              document.addEventListener('mousemove', handleMouseMove);
              document.addEventListener('mouseup', () => {
                document.removeEventListener('mousemove', handleMouseMove);
              });
            }}
          />
        </div>
      </div>

      {/* Playback Controls */}
      <div className="flex justify-center items-center gap-8 py-4 border-t border-[var(--mobile-border)]">
        <button className="p-2">
          <ChevronLeft size={24} color="var(--mobile-text-secondary)" strokeWidth={1.5} />
        </button>
        <button className="flex items-center gap-2">
          <Circle size={12} fill="var(--mobile-green)" color="var(--mobile-green)" />
          <span className="text-[13px] font-semibold text-[var(--mobile-green)]">Live</span>
        </button>
        <button className="p-2">
          <ChevronRight size={24} color="var(--mobile-text-secondary)" strokeWidth={1.5} />
        </button>
      </div>

      {/* Completion Toast */}
      <div className="mx-4 mb-4 p-3 rounded-xl bg-[var(--mobile-surface-raised)] flex items-center gap-2">
        <Circle size={12} fill="var(--mobile-green)" color="var(--mobile-green)" />
        <span className="text-[13px] text-[var(--mobile-text-secondary)]">
          Task completed: Project setup successful
        </span>
      </div>
    </div>
  );
}
