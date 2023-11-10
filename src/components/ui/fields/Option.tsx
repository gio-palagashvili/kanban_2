import { FC } from "react";

interface OptionProps {
  checked: boolean;
  taskName: string;
  taskId: string;
  change: (e: React.ChangeEvent<HTMLInputElement>, taskId: string) => void;
}

const Option: FC<OptionProps> = ({ checked, taskName, change, taskId }) => {
  return (
    <label className="flex bg-[#20212B] p-3 rounded-md gap-3 h-12 place-items-center hover:bg-[#393959] cursor-pointer">
      <input
        type="checkbox"
        className="accent-mainPurple scale-125"
        checked={checked}
        onChange={(e) => change(e, taskId)}
      />
      <p
        className={
          checked
            ? "text-xs font-bold line-through text-mainText"
            : "text-xs font-bold"
        }
      >
        {taskName}
      </p>
    </label>
  );
};

export default Option;
