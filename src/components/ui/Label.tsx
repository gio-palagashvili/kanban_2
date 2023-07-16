import { cn } from "@/lib/utils";
import React, { FC, HtmlHTMLAttributes } from "react";

interface LabelProps extends HtmlHTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

const Label: FC<LabelProps> = ({ className, children }) => {
  return (
    <h1 className={cn(className, "text-xs font-[600] mb-1 text-mainText")}>
      {children}
    </h1>
  );
};

export default Label;
