import { FC } from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

const Select: FC<SelectProps> = ({ children, ...props }) => {
  return (
    <select
      {...props}
      id="customSel"
      className="p-1 bg-transparent font-[500] appearance-none placeholder-gray-500/70 border-[1px] text-xs pl-3 border-gray-500/40 rounded-md outline-none focus:ring-1 focus:ring-mainPurple h-10 w-full"
    >
      {children}
    </select>
  );
};

export default Select;
