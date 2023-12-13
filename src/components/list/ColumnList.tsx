import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import React, { FC } from "react";

interface ColumnListProps
  extends VariantProps<typeof columnListVariants>,
    React.HtmlHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const columnListVariants = cva(
  "w-full flex flex-col gap-2 h-fit py-1 overflow-y-scroll overflow-x-hidden",
  {
    variants: {
      size: {
        small: "max-h-[7rem]",
        medium: "max-h-[10rem]",
      },
    },
    defaultVariants: {
      size: "small",
    },
  }
);

const ColumnList: FC<ColumnListProps> = ({
  children,
  size,
  className,
  ...props
}) => {
  return (
    <div {...props} className={cn(columnListVariants({ size, className }))}>
      {children}
    </div>
  );
};

export default ColumnList;
