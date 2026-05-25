'use client';

import { cn } from "@/lib/utils";

export function BubbleBackgroundIOS({ className }) {
  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none gradient-bg flex ",
        className
    
      )}
    >
      <div className="ios-gradient-base" />
      <div className="gradient-blob" />
      <div className="gradient-noise" />
    </div>
  );
}
