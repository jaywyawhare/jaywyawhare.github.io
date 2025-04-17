interface NoBlogsFallbackProps {
  message: string;
  className?: string;
}

const NoBlogsFallback = ({ message, className = '' }: NoBlogsFallbackProps) => {
  return (
    <div className={`flex items-center justify-center p-8 ${className}`}>
      <p className="text-lg text-muted-foreground text-center">{message}</p>
    </div>
  );
};

export default NoBlogsFallback;
