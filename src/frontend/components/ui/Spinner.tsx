import React from "react";
export default function Spinner({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <svg width="100" height="100" className="animate-spin">
      <circle
        cx="50"
        cy="50"
        fill="none"
        r="25"
        stroke-width="10"
        stroke="#E387FF"
        stroke-dasharray="100 150"
      />
    </svg>
  );
}
