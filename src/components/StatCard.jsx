import React from "react";

export default function StatCard({ title }) {
  return (
    <div className="rounded-xl border border-neutral-200/70 bg-white p-4 shadow-sm">
      <p className="text-sm text-neutral-600">{title}</p>
      <div className="mt-4 h-5 w-20 rounded bg-neutral-100"></div>
    </div>
  );
}
