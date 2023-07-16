import { FC, InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import Button from "./Button";
import { IoCloseOutline } from "react-icons/io5";
import Label from "./Label";

export const inputVariants = cva("input font-semibold", {
  variants: {
    variant: {
      main: "p-1 bg-transparent font-[500] placeholder-gray-500/70 border-[1px] text-xs pl-3 border-gray-500/40 rounded-md outline-none focus:ring-1 focus:ring-mainPurple h-10 w-full",
    },
  },
  defaultVariants: {
    variant: "main",
  },
});

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  isLoading?: boolean;
  showLoading?: boolean;
  isColumn?: boolean;
  label?: string;
  close?: () => void;
}

const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      children,
      showLoading = true,
      variant,
      isLoading,
      close,
      isColumn,
      label,
      ...props
    },
    ref
  ) => {
    return (
      <>
        <Label
          className={cn(label ? "text-xs font-[600] text-mainText" : "hidden")}
        >
          {label}
        </Label>
        <input
          className={cn(inputVariants({ variant, className }))}
          disabled={isLoading && showLoading}
          ref={ref}
          {...props}
        />
        <Button
          variant={"x"}
          className={cn(
            isColumn ? "flex place-items-center p-0 w-9" : "hidden"
          )}
        >
          <IoCloseOutline
            onClick={close}
            size={25}
            className="stroke-gray-300 self-end ml-auto"
          />
        </Button>
      </>
    );
  }
);

Input.displayName = "Input";

export default Input;
