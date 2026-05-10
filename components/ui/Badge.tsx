import React from 'react';
import { Award, Shield, MapPin } from 'lucide-react';

interface BadgeProps {
  type: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Badge = ({ type, size = 'sm', className = '' }: BadgeProps) => {
  const styles = {
    base: "bg-red-50 text-red-700 border-red-100 hover:bg-red-100",
    gold: "bg-amber-50 text-amber-700 border-amber-100 hover:bg-amber-100",
    local: "bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100",
  };

  let currentStyle = styles.base;
  let Icon = Award;

  if (type.includes("Gold") || type.includes("Contributor")) {
    currentStyle = styles.gold;
    Icon = Shield;
  } else if (type.includes("Local")) {
    currentStyle = styles.local;
    Icon = MapPin;
  }

  const sizeClasses = size === "lg" ? "px-3 py-1.5 text-sm" : "px-2.5 py-1 text-xs";

  return (
    <span className={`inline-flex items-center border rounded-full font-semibold tracking-wide transition-colors duration-200 cursor-default ${currentStyle} ${sizeClasses} ${className}`}>
      <Icon className={`${size === 'lg' ? 'w-4 h-4' : 'w-3 h-3'} mr-1.5`} />
      {type}
    </span>
  );
};