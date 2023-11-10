import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import React, { FC, RefObject } from "react";

interface MainCardProps
  extends VariantProps<typeof cardVariants>,
    React.HtmlHTMLAttributes<HTMLDivElement> {
  ref: RefObject<HTMLDivElement>;
  children: React.ReactNode;
}

const cardVariants = cva("rounded-md shadow-md ", {
  variants: {
    variant: {
      main: "bg-main flex flex-col",
    },
    size: {
      medium: "p-7 w-[30rem] gap-2",
    },
  },
  defaultVariants: {
    variant: "main",
    size: "medium",
  },
});

const MainCard = React.forwardRef<HTMLDivElement, MainCardProps>(
  ({ size, variant, children, className, ...props }, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        className={cn(cardVariants({ variant, size, className }))}
      >
        {children}
      </div>
    );
  }
);

MainCard.displayName = "MainCard";

export default MainCard;
