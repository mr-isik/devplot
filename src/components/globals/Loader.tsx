import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import React from "react";

type Props = {
  state: boolean;
  className?: string;
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg";
};

const Loader = ({ state, children, className, size = "md" }: Props) => {
  if (!state) {
    return children;
  }

  const sizeClass =
    size === "sm" ? "size-4" : size === "lg" ? "size-8" : "size-6";

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear",
          }}
        >
          <Loader2 className={cn(sizeClass)} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Loader;
