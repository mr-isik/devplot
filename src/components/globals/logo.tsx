import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

type Props = {
  className?: string;
  size?: number;
};

const Logo = ({ className, size = 32 }: Props) => {
  return (
    <div className={cn("inline-flex items-center justify-center", className)}>
      <Image
        src="/devplot_logo.png"
        alt="DevPlot Logo"
        width={size}
        height={size}
      />
    </div>
  );
};

export default Logo;
