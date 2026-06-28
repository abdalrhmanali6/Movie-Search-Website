import { AlertTriangle, Clapperboard, RefreshCw, SearchX } from "lucide-react";

type StateMessageProps = {
  variant?: "empty" | "error" | "not-found";
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
};

const icons = {
  empty: SearchX,
  error: AlertTriangle,
  "not-found": Clapperboard,
};

const StateMessage = ({
  variant = "empty",
  title,
  message,
  actionLabel,
  onAction,
  className = "",
}: StateMessageProps) => {
  const Icon = icons[variant];

  return (
    <section
      className={`mx-auto flex min-h-80 w-full max-w-3xl flex-col items-center justify-center px-6 py-16 text-center ${className}`}
    >
      <div className="mb-6 flex size-16 items-center justify-center rounded-full border border-white/10 bg-surface-container-high text-primary">
        <Icon size={30} />
      </div>
      <h1 className="mb-3 font-headline-lg text-headline-lg text-white">
        {title}
      </h1>
      <p className="max-w-xl text-on-surface-variant">{message}</p>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-8 flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-label-sm text-on-primary transition hover:brightness-110"
        >
          <RefreshCw size={16} />
          {actionLabel}
        </button>
      )}
    </section>
  );
};

export default StateMessage;
