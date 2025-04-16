import React from 'react';

interface NoProjectsFallbackProps {
  message: string;
  className?: string;
}

const NoProjectsFallback = ({ message, className = '' }: NoProjectsFallbackProps) => {
  return (
    <div className={`flex items-center justify-center p-8 ${className}`}>
      <p className="text-lg text-muted-foreground text-center">{message}</p>
    </div>
  );
};

export default NoProjectsFallback;
