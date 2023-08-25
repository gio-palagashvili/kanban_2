"use client";
import { cn } from "@/lib/utils";
import { FC } from "react";
import { toast, type Toast } from "react-hot-toast";

interface confirmToastProps {
  t: Toast;
}

const confirmToast: FC<confirmToastProps> = ({ t }) => {
  return (
    <div
      className={cn(
        "w-96 p-3 mb-1 rounded-lg pointer-events-auto bg-off flex cursor-pointer",
        {
          "animate-enter": t.visible,
          "animate-leave": !t.visible,
        }
      )}
    ></div>
  );
};

export default confirmToast;
