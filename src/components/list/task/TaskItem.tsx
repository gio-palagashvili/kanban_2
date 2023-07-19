import { FC, HtmlHTMLAttributes, forwardRef, Ref } from "react";

interface TaskItemProps extends HtmlHTMLAttributes<HTMLDivElement> {
  name: string;
  complete: number;
  avilable: number;
}

const TaskItem: FC<TaskItemProps> = forwardRef(
  (
    { name, avilable, complete, ...props }: TaskItemProps,
    ref: Ref<HTMLDivElement>
  ) => {
    return (
      <div
        ref={ref}
        {...props}
        id="task"
        className="w-full bg-main py-6 px-4 rounded-md shadow-md cursor-pointer hover:text-mainPurple duration-200"
      >
        <h1 className="text-md mb-1 font-bold">{name}</h1>
        <p className="text-xs text-mainText font-semibold">
          {complete} out of {avilable} subtasks
        </p>
      </div>
    );
  }
);

TaskItem.displayName = "TaskItem";
export default TaskItem;
