'use client';

import { useState } from 'react';
import { Clock, Library, Folder, Search, X, Image, FileText, Globe, Code, Zap, Plus } from 'lucide-react';
import TaskRow from '../TaskRow';

type FilterType = 'all' | 'scheduled' | 'projects' | 'favorites';

export default function TasksScreen() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [dismissPromo, setDismissPromo] = useState(false);

  return (
    <div className="mobile-screen absolute inset-0 flex flex-col overflow-hidden">
      {/* Top Bar */}
      <div className="mobile-topbar flex justify-between items-center">
        <div className="w-8 h-8 rounded-full bg-[var(--mobile-accent)] flex items-center justify-center relative">
          <span className="text-[10px] font-bold text-[var(--mobile-bg)]">V</span>
          <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-[var(--mobile-destructive)]" />
        </div>
        <span className="font-bold text-[15px] text-[var(--mobile-text-primary)]">velocity</span>
        <button className="p-2 -mr-2">
          <Search size={20} color="var(--mobile-text-secondary)" strokeWidth={1.5} />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="mobile-scrollable mobile-tab-bar-bottom overflow-y-auto">
        {/* Promo Banner */}
        {!dismissPromo && (
          <div className="mx-4 mt-4 p-3 rounded-[14px] bg-[var(--mobile-surface)] flex items-center gap-3 mb-4">
            <Zap size={18} color="var(--mobile-accent)" strokeWidth={1.5} />
            <span className="flex-1 text-[13px] text-[var(--mobile-text-secondary)]">
              Invite friends & earn 500 credits each
            </span>
            <button onClick={() => setDismissPromo(true)} className="p-1 -mr-1">
              <X size={16} color="var(--mobile-text-muted)" strokeWidth={2} />
            </button>
          </div>
        )}

        {/* 3-Column Grid */}
        <div className="grid grid-cols-3 gap-3 px-4 mb-6">
          <button className="p-4 rounded-xl bg-[var(--mobile-surface)] h-20 flex flex-col items-center justify-center gap-2">
            <Clock size={22} color="var(--mobile-text-secondary)" strokeWidth={1.5} />
            <span className="text-[12px] text-[var(--mobile-text-secondary)]">Scheduled</span>
          </button>
          <button className="p-4 rounded-xl bg-[var(--mobile-surface)] h-20 flex flex-col items-center justify-center gap-2">
            <Library size={22} color="var(--mobile-text-secondary)" strokeWidth={1.5} />
            <span className="text-[12px] text-[var(--mobile-text-secondary)]">Library</span>
          </button>
          <button className="p-4 rounded-xl bg-[var(--mobile-surface)] h-20 flex flex-col items-center justify-center gap-2">
            <Folder size={22} color="var(--mobile-text-secondary)" strokeWidth={1.5} />
            <span className="text-[12px] text-[var(--mobile-text-secondary)]">Projects</span>
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 px-4 mb-6 overflow-x-auto pb-2">
          {(['all', 'scheduled', 'projects', 'favorites'] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`mobile-pill ${f === filter ? 'active' : 'inactive'}`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Task List */}
        <div className="bg-[var(--mobile-surface-raised)] mx-2 rounded-xl overflow-hidden">
          <div className="px-4 py-3 text-[13px] uppercase font-bold text-[var(--mobile-text-secondary)] tracking-wide">
            Agent
          </div>
          <div>
            <TaskRow icon={<Image size={18} />} title="Generate product images" />
            <TaskRow icon={<FileText size={18} />} title="Create blog post draft" />
            <TaskRow icon={<Globe size={18} />} title="Update website copy" />
            <TaskRow icon={<Code size={18} />} title="Build API integration" />
          </div>
        </div>
      </div>

      {/* FAB */}
      <button className="mobile-fab flex items-center justify-center">
        <Plus size={24} color="black" strokeWidth={2} />
      </button>
    </div>
  );
}
