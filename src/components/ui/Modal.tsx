import { cn } from "@/lib/utils";
import { FC, useEffect } from "react";

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  isOpen: boolean;
  close: () => void;
}

const Modal: FC<ModalProps> = ({ children, isOpen, close, ...props }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && close) {
        close();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
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
