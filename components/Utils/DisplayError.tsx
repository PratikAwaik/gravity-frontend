import * as React from "react";

interface DisplayErrorProps {
  error: string | null;
}

export default function DisplayError({ error }: DisplayErrorProps) {
  return error ? (
    <div className="my-1 text-xs text-theme-red font-medium">{error}</div>
  ) : null;
}
