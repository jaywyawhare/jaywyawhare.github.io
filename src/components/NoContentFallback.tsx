interface NoContentFallbackProps {
  message: string;
  className?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const NoContentFallback = ({ message, className = '', action }: NoContentFallbackProps) => {
  return (
    <div className={`flex flex-col items-center justify-center gap-4 p-8 ${className}`}>
      <p className="text-lg text-muted-foreground text-center">{message}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="text-sm text-primary hover:underline"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

export default NoContentFallback;
