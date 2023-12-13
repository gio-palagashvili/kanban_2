import { InputHTMLAttributes, forwardRef } from "react";
import Input from "@/components/ui/fields/Input";
import Button from "@/components/ui/Button";
import { IoCloseOutline } from "react-icons/io5";

interface ColumnProps extends InputHTMLAttributes<HTMLInputElement> {
  IoCloseOutlineClick: () => void;
}

const Column = forwardRef<HTMLInputElement, ColumnProps>(
  ({ IoCloseOutlineClick, ...props }, ref) => {
    return (
      <div className="w-full flex place-items-center ml-[1px]" ref={ref}>
        <Input className="w-[90%]" {...props} />
        <Button variant={"x"} className={"flex place-items-center p-0 w-9"}>
          <IoCloseOutline
            onClick={IoCloseOutlineClick}
            size={25}
            className="stroke-gray-300 ml-auto hover:stroke-slate-400 hover:scale-95 transition-all"
          />
        </Button>
      </div>
    );
  }
);

Column.displayName = "Column";

export default Column;
