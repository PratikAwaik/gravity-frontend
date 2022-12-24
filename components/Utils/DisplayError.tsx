import * as React from "react";

interface DisplayErrorProps {
  error: string | null;
  className?: string;
}

export default function DisplayError({ error, className }: DisplayErrorProps) {
  return error ? (
    <div className={`my-1 text-xs text-theme-red font-medium ${className}`}>
      {error}
    </div>
  ) : null;
}
