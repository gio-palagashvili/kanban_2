import { FC } from "react";

interface TaskItemProps {
  name: string;
  complete: number;
  avilable: number;
}

const TaskItem: FC<TaskItemProps> = ({ name, avilable, complete }) => {
  return (
    <div
      id="task"
      className="w-full bg-main py-6 px-4 rounded-md shadow-md cursor-pointer"
    >
      <h1 className="text-md mb-1 font-bold">{name}</h1>
      <p className="text-xs text-mainText font-semibold">
        {complete} out of {avilable} subtasks
      </p>
    </div>
  );
};

export default TaskItem;
