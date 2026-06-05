'use client';

import { useState, useRef } from 'react';
import { ChevronLeft, Share2, BarChart3, MoreVertical, ChevronDown, Send, Mic, Plus } from 'lucide-react';
import MessageBubble from '../MessageBubble';
import StepItem from '../StepItem';

export default function ChatScreen() {
  const [input, setInput] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      setScrolled(scrollRef.current.scrollTop > 20);
    }
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  };

  return (
    <div className="mobile-screen active absolute inset-0 flex flex-col">
      {/* Top Bar */}
      <div className="mobile-topbar flex justify-between items-center">
        <button className="p-2 -ml-2">
          <ChevronLeft size={20} color="var(--mobile-text-secondary)" strokeWidth={1.5} />
        </button>
        <div className="flex flex-col items-center">
          <span className="font-semibold text-15px text-[var(--mobile-text-primary)]">Velocity</span>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="text-[11px] font-mono bg-[var(--mobile-surface-raised)] px-2 py-1 rounded-full text-[var(--mobile-text-secondary)]">
              Apex Mode
            </span>
            <ChevronDown size={14} color="var(--mobile-text-secondary)" strokeWidth={1.5} />
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2 -mr-2">
            <Share2 size={20} color="var(--mobile-text-secondary)" strokeWidth={1.5} />
          </button>
          <button className="p-2 -mr-2">
            <BarChart3 size={20} color="var(--mobile-text-secondary)" strokeWidth={1.5} />
          </button>
          <button className="p-2 -mr-2">
            <MoreVertical size={20} color="var(--mobile-text-secondary)" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="mobile-scrollable mobile-tab-bar-bottom"
      >
        <div className="flex flex-col gap-6 p-4">
          {/* Agent Message */}
          <MessageBubble
            role="agent"
            header={
              <>
                <div className="w-7 h-7 rounded-full bg-[var(--mobile-accent)] flex items-center justify-center">
                  <span className="text-[10px] font-bold text-[var(--mobile-bg)]">V</span>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--mobile-accent)]">Velocity</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--mobile-surface-raised)] text-[var(--mobile-text-secondary)]">
                  Apex
                </span>
              </>
            }
          >
            I'm analyzing your project structure and preparing to implement the mobile design system. Let me break this down into actionable steps.
            <div className="mt-4 space-y-2">
              <StepItem
                title="Design tokens setup"
                completed
                tools={['CSS Variables', 'Tailwind Integration']}
              />
              <StepItem
                title="Component architecture"
                tools={['Mobile viewport', 'Tab navigation', 'Input handling']}
                description="Building reusable components with iOS-native feel and safe-area support."
              />
              <StepItem
                title="Screen implementation"
                tools={['Chat interface', 'Task management', 'Settings UI']}
              />
            </div>
          </MessageBubble>

          {/* User Message */}
          <MessageBubble role="user">
            Build a Velocity mobile design with 5 screens
          </MessageBubble>

          {/* Agent Response */}
          <MessageBubble
            role="agent"
            header={
              <>
                <div className="w-7 h-7 rounded-full bg-[var(--mobile-accent)] flex items-center justify-center">
                  <span className="text-[10px] font-bold text-[var(--mobile-bg)]">V</span>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--mobile-accent)]">Velocity</span>
              </>
            }
          >
            Done! The design is now live. All 5 screens are ready with native iOS interactions.
          </MessageBubble>
        </div>
      </div>

      {/* Scroll to Bottom Button */}
      {scrolled && (
        <button
          onClick={scrollToBottom}
          className="mobile-fab"
          style={{ bottom: `calc(76px + var(--safe-area-inset-bottom, 0px) + 16px)` }}
        >
          ↓
        </button>
      )}

      {/* Input Bar */}
      <div className="mobile-input-bar">
        <div className="flex gap-2">
          <button className="w-9 h-9 rounded-full bg-[var(--mobile-surface-raised)] flex items-center justify-center">
            <Plus size={18} color="var(--mobile-text-secondary)" strokeWidth={1.5} />
          </button>
          <div className="flex-1 px-3 py-1.5 rounded-full bg-[var(--mobile-surface-raised)] flex items-center">
            <span className="text-[13px] text-[var(--mobile-text-muted)]">GitHub +9</span>
          </div>
          <button className="p-2">
            <Mic size={18} color="var(--mobile-text-secondary)" strokeWidth={1.5} />
          </button>
          <button className="w-9 h-9 rounded-full bg-[var(--mobile-accent)] flex items-center justify-center">
            <Send size={16} color="var(--mobile-bg)" strokeWidth={2} />
          </button>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message Velocity"
          className="w-full bg-transparent text-[var(--mobile-text-primary)] placeholder-[var(--mobile-text-muted)] border-none outline-none text-[15px] resize-none max-h-24"
          rows={1}
        />
      </div>
    </div>
  );
}
