import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import * as React from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:shadow-md hover:shadow-destructive/30",
        outline:
          "border border-input bg-transparent hover:border-accent hover:bg-accent hover:text-accent-foreground hover:shadow-sm",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-sm",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gradient:
          "bg-gradient-to-r from-primary to-accent text-primary-foreground hover:shadow-md hover:shadow-primary/20 hover:brightness-110 btn-shine",
        glow: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_15px_rgba(var(--primary-rgb)/40%)] animate-pulse-glow",
        soft: "bg-primary/10 text-primary hover:bg-primary/20 hover:shadow-sm",
        glossy:
          "bg-primary bg-gradient-to-b from-white/20 to-transparent text-primary-foreground backdrop-blur-sm backdrop-filter hover:bg-primary/90 hover:shadow-md",
        glass:
          "glass text-primary-foreground hover:bg-primary/20 hover:shadow-md transition-all",
        "glass-dark":
          "glass-dark text-primary-foreground hover:bg-primary/20 hover:shadow-md transition-all",
        neon: "bg-primary/90 text-primary-foreground hover:shadow-[0_0_20px_rgba(var(--primary-rgb)/70%)] border border-primary/20 hover:border-primary/40 hover:brightness-110",
        "3d": "bg-primary text-primary-foreground border-b-4 border-primary-foreground/20 active:border-b-0 active:mt-1 active:mb-[-1px] hover:brightness-110",
        social:
          "bg-background text-foreground hover:bg-muted/80 border border-border hover:border-accent/40 hover:shadow-sm",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-6",
        xl: "h-12 rounded-md px-10 text-base",
        "2xl": "h-14 rounded-md px-12 text-lg",
        icon: "size-10",
        iconSm: "size-8",
        iconLg: "size-12",
      },
      rounded: {
        default: "rounded-md",
        full: "rounded-full",
        pill: "rounded-[999px]",
        none: "rounded-none",
        sm: "rounded-sm",
        lg: "rounded-lg",
        xl: "rounded-xl",
      },
      animation: {
        none: "",
        pulse: "animate-pulse",
        bounce: "animate-bounce-subtle",
        gradient: "animate-gradient",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
      animation: "none",
    },
  }
);

export type ButtonProps = {
  asChild?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      rounded,
      animation,
      asChild = false,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, rounded, animation, className })
        )}
        ref={ref}
        {...props}
      >
        {leftIcon}
        {children}
        {rightIcon}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
