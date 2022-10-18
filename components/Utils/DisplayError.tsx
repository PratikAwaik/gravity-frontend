import * as React from "react";

interface DisplayErrorProps {
  error: string | null;
}

export default function DisplayError({ error }: DisplayErrorProps) {
  return error ? (
    <div className="p-2 text-lg bg-theme-red rounded-lg text-center mb-6">
      {error}
    </div>
  ) : null;
}
