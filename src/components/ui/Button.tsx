import { cva, VariantProps } from "class-variance-authority";
import React, { FC } from "react";
import { cn } from "@/lib/utils";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface ButtonProps
  extends React.HtmlHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonvariants> {
  isLoading?: boolean;
}

const buttonvariants = cva(
  "flex place-items-center justify-center gap-2 disabled:bg-slate-400",
  {
    variants: {
      variant: {
        main: "bg-mainPurple font-bold hover:bg-[#5451a8] duration-300 rounded-full",
        secondary:
          "bg-white text-mainPurple font-bold duration-300 rounded-full hover:bg-white/80",
        x: "p-0",
        warning:
          "bg-red-500 font-bold hover:bg-red-500/80 duration-300 rounded-full",
      },
      size: {
        small: "p-3 w-12",
        medium: "p-2 w-40 h-12 text-sm",
        secondary: "w-full mt-2 h-10 font-[500] text-sm",
        full: "w-full",
      },
      extra: {
        plus: "font-bold text-lg",
      },
    },
    defaultVariants: {
      variant: "main",
      size: "small",
    },
  }
);

const Button: FC<ButtonProps> = ({
  className,
  size,
  variant,
  isLoading,
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={isLoading}
      className={cn(buttonvariants({ variant, size, className, ...props }))}
    >
      {isLoading ? <AiOutlineLoading3Quarters className="animate-spin" /> : ""}
      {props.children}
    </button>
  );
};

export default Button;
