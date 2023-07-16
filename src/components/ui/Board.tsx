import React, { ButtonHTMLAttributes, FC } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const boardVariants = cva(
  "w-[90%] flex pl-[1000px] place-items-center gap-3 cursor-pointer text-xl py-[15px]",
  {
    variants: {
      variant: {
        default:
          "text-mainText hover:bg-[white] rounded-r-full duration-300 hover:text-mainPurple mt-[2px]",
        selected:
          "bg-mainPurple rounded-r-full hover:bg-[#5352a7] duration-200",
        new: "text-mainPurple hover:underline",
      },
      size: {
        default: "p-3 pl-6",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

interface BoardProps
  extends React.HtmlHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof boardVariants> {
  text: string;
  fill?: string;
}

const Board: FC<BoardProps> = ({ className, size, variant, ...props }) => {
  return (
    <button {...props}>
      <div
        className={cn(boardVariants({ variant, size, className, ...props }))}
      >
        <svg
          xmlnsXlink="http://www.w3.org/1999/xlink"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
        >
          <path
            d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
            fill={props.fill ? props.fill : "#828FA3"}
          ></path>
        </svg>
        <h3 className="font-bold tracking-wide text-[14px]">{props.text}</h3>
      </div>
    </button>
  );
};

export { Board, boardVariants };
