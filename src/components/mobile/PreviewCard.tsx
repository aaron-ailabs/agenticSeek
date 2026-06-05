'use client';

interface PreviewCardProps {
  filename: string;
  content: string;
}

export default function PreviewCard({ filename, content }: PreviewCardProps) {
  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div
        className="rounded-[14px] bg-[var(--mobile-surface)] p-4 w-full max-h-[60vh] overflow-hidden relative"
      >
        <div className="text-center text-[11px] text-[var(--mobile-text-muted)] mb-3 font-mono">
          {filename}
        </div>
        <div className="text-[13px] text-[var(--mobile-text-primary)] font-mono overflow-y-auto max-h-[50vh] leading-relaxed pb-12">
          {content}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[var(--mobile-surface)] to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
