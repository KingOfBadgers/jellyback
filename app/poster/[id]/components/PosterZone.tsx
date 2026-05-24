"use client";

export default function PosterZone({
  id,
  title,
  className = "",
  children,
  activeZone,
  onClick,
}: {
  id: string;
  title: string;
  className?: string;
  children?: React.ReactNode;
  activeZone?: string | null;
  onClick?: () => void;
}) {
  const isActive = activeZone === id;

  return (
    <div
      onClick={onClick}
      className={`
        relative flex items-center justify-center text-center
        border border-dashed rounded-2xl backdrop-blur-sm
        transition cursor-pointer
        ${
          isActive
            ? "border-white/70 bg-white/10"
            : "border-white/20 bg-black/20 hover:bg-black/30"
        }
        ${className}
      `}
    >
      {children ? (
        <div className="w-full px-3">{children}</div>
      ) : (
        <div className="text-xs text-white/50 uppercase tracking-widest">
          {title}
        </div>
      )}
    </div>
  );
}