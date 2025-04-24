import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SkillCardProps {
  id: string;
  name: string;
  Icon: React.ElementType;
  color: string;
  index: number;
  onRemove: () => void;
  isRemoving: boolean;
  className?: string;
}

export function SkillCard({
  id,
  name,
  Icon,
  color,
  index,
  onRemove,
  isRemoving,
  className,
}: SkillCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        scale: 1,
        y: isRemoving ? 10 : 0,
        opacity: isRemoving ? 0 : 1,
      }}
      exit={{ opacity: 0, scale: 0.9, y: 10 }}
      transition={{
        opacity: { duration: 0.2 },
        layout: { duration: 0.2, type: "spring" },
        delay: index * 0.05,
      }}
      className={cn(
        "group relative flex h-12 w-full items-center gap-3 rounded-md border bg-card p-3 shadow-sm transition-all hover:shadow",
        className
      )}
    >
      <div
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded"
        style={{ backgroundColor: color }}
      >
        {React.createElement(Icon, {
          className: "h-3.5 w-3.5 text-white",
        })}
      </div>
      <div className="flex-grow overflow-hidden">
        <span className="block truncate text-sm font-medium">{name}</span>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-muted opacity-0 transition-opacity hover:bg-muted/90 group-hover:opacity-100"
        aria-label={`Remove ${name}`}
      >
        <X className="h-3 w-3" />
      </button>
    </motion.div>
  );
}
