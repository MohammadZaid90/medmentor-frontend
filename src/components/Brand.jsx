import React, { useEffect } from "react";

export default function Brand({ label = "Virtual Patient" }) {
  useEffect(() => {
    window.lucide && window.lucide.createIcons();
  }, []);

  return (
    <div className="flex items-center gap-3">
      <i data-lucide="stethoscope" className="w-10 h-10 text-teal-600"></i>
      <span className="text-3xl font-bold tracking-tight text-neutral-600">{label}</span>
    </div>
  );
}
