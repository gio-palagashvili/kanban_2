import { FC } from "react";
import TaskItem from "./task/TaskItem";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface ColumnListItemProps {
  col: Column;
}

const ColumnListItem: FC<ColumnListItemProps> = ({ col }) => {
  return (
    <Droppable droppableId={col.id}>
      {(provided, snapshot) => {
        return (
          <div
            className="w-72 flex-none"
            id="column_list_lane"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <h1 className="text-[#848FA1] text-[13px] capitalize z">
              {col.name}({col.Tasks.length})
            </h1>
            <div
              className="flex flex-col gap-2 mt-4 h-[90%] overflow-y-scroll"
              id="tasks_container_list"
            >
              {col.Tasks.map((task) => {
                const subTaskComp = task.SubTasks.filter(
                  (task) => task.complete
                );
                return (
                  <TaskItem
                    key={task.id}
                    avilable={task.SubTasks.length}
                    complete={subTaskComp.length}
                    name={task.name}
                  />
                );
              })}
            </div>
          </div>
        );
      }}
    </Droppable>
  );
};

export default ColumnListItem;
