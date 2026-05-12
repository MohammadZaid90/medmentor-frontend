import React from "react";

export default function ChatBubble({ side = "left", children }) {
  return (
    <div
      className={`flex ${
        side === "right" ? "justify-end" : "justify-start"
      } w-full`}
    >
      <div
        className={`max-w-[85%] rounded-xl border border-neutral-200/70 shadow-sm px-3.5 py-2.5 text-sm ${
          side === "right"
            ? "bg-teal-50 text-neutral-900"
            : "bg-white text-neutral-900"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
