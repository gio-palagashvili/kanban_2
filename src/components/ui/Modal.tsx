import { cn } from "@/lib/utils";
import { FC } from "react";

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  isOpen: boolean;
}

const Modal: FC<ModalProps> = ({ children, isOpen, ...props }) => {
  return (
    <div
      className={
        isOpen
          ? cn(
              "absolute top-0 w-[100vw] h-[100vh] md:bg-black/50 z-10 bg-transparent",
              props.className
            )
          : "hidden"
      }
    >
      {children}
    </div>
  );
};

export default Modal;
