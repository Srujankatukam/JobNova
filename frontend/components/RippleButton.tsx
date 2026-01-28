"use client";

import { useState, useRef, MouseEvent } from "react";
import { motion } from "framer-motion";

interface RippleButtonProps {
  children: React.ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
}

export default function RippleButton({
  children,
  onClick,
  className = "",
  disabled = false,
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleIdRef = useRef(0);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = {
      x,
      y,
      id: rippleIdRef.current++,
    };

    setRipples((prev) => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 600);

    onClick?.(e);
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      disabled={disabled}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 pointer-events-none"
          initial={{ width: 0, height: 0, x: ripple.x, y: ripple.y }}
          animate={{
            width: 200,
            height: 200,
            x: ripple.x - 100,
            y: ripple.y - 100,
            opacity: [0.5, 0],
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
    </button>
  );
}

