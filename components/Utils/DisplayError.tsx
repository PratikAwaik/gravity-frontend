import * as React from "react";

export default function DisplayError({ error }: { error: any }) {
  return (
    error && (
      <div className="p-2 text-lg bg-theme-red rounded-lg text-center mb-6">
        {error}
      </div>
    )
  );
}
