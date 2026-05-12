"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "motion/react";
import { Children, cloneElement, useRef, useState } from "react";

function DockItem({
  children,
  label,
  className = "",
  onClick,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
}) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseDistance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: baseItemSize,
    };
    return val - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize]
  );
  const size = useSpring(targetSize, spring);

  return (
    <motion.div
      ref={ref}
      style={{
        width: size,
        height: size,
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative inline-flex items-center justify-center rounded-full bg-white shadow-md cursor-pointer transition-transform duration-200 hover:scale-105 ${className}`}
    >
      {Children.map(children, (child) => cloneElement(child))}

      <AnimatePresence>
        {isHovered && (
          <motion.span
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: -10 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-[#060010] text-white text-xs px-2 py-0.5 rounded-md whitespace-nowrap"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function DockIcon({ children, className = "" }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      {children}
    </div>
  );
}

export default function Dock({
  items,
  logoSrc = "../assets/Logo/logo.png",
  className = "",
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 70,
  distance = 200,
  baseItemSize = 90,
}) {
  const mouseX = useMotionValue(Infinity);
  return (
    <div className="fixed inset-x-0 top-1 z-50 flex justify-center px-4 sm:px-8">
      {/* Dock container with glassmorphism */}
      <div
        onMouseMove={({ pageX }) => mouseX.set(pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={`flex items-end rounded-3xl px-4 sm:px-6 py-2 sm:py-3 bg-white/20 backdrop-blur-xl border border-white/30 shadow-lg ${className}`}
        role="toolbar"
        aria-label="Application dock"
      >
        {/* Logo */}
        <img
          src={logoSrc}
          alt="Logo"
          className="w-12 h-12 sm:w-16 sm:h-16 rounded hover:scale-105 transition-transform duration-300 object-contain"
        />
        {/* Spacer to push icons away from logo */}
        <div className="w-16 sm:w-64" /> {/* smaller on small screens */}
        {/* Dock icons */}
        <div className="flex items-end gap-4 sm:gap-12">
          {items.map((item, index) => (
            <DockItem
              key={index}
              label={item.label}
              onClick={item.onClick}
              className={item.className}
              mouseX={mouseX}
              spring={spring}
              distance={distance}
              magnification={magnification}
              baseItemSize={baseItemSize}
            >
              <DockIcon>{item.icon}</DockIcon>
            </DockItem>
          ))}
        </div>
      </div>
    </div>
  );
}
