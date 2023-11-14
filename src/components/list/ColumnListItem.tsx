"use client";
import { FC, Ref, forwardRef, useRef, useState } from "react";
import TaskItem from "./task/TaskItem";
import { Draggable } from "react-beautiful-dnd";
import Modal from "@/components/ui/Modal";
import MainCard from "../ui/cards/MainCard";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import Option from "../ui/fields/Option";
import Select from "../ui/fields/Select";
import axios from "axios";
import toast from "react-hot-toast";

interface ColumnListItemProps {
  col: Column;
  cols: Column[];
}

const ColumnListItem: FC<ColumnListItemProps> = forwardRef(
  ({ col, cols, ...props }: ColumnListItemProps, ref: Ref<HTMLElement>) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [task, setTask] = useState<Task>();
    const localRef = useRef<HTMLElement>(null);

    useOnClickOutside(localRef, () => {
      setIsOpen(false);
      setTask(undefined);
    });

    const handleCheckChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      subtaskId: string
    ) => {
      setTask((prevTask) => {
        if (prevTask) {
          const n = prevTask.SubTasks.map((SubTask) => {
            if (subtaskId === SubTask.id) {
              return (SubTask.complete = e.target.checked);
            }
            return SubTask;
          });
          return { ...prevTask, n };
        }
      });

      axios
        .post("/api/task/subtask/status", {
          subtaskId: subtaskId,
          complete: e.target.checked,
        })
        .catch((err) => {
          setTask((prevTask) => {
            if (prevTask) {
              const n = prevTask.SubTasks.map((SubTask) => {
                if (subtaskId === SubTask.id) {
                  return (SubTask.complete = !e.target.checked);
                }
                return SubTask;
              });
              return { ...prevTask, n };
            }
          });
          toast.error(err.response.data);
        });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      axios
        .patch("/api/task/change", {
          colId: e.target.value,
          taksId: task?.id,
        })
        .then(() => {
          window.location.reload();
        })
        .catch((err) => {
          toast.error(err.response.data);
        });
    };

    return (
      <>
        <div
          className="w-72 flex-none"
          id="column_list_lane"
          key={`col_${col.id}`}
          {...props}
          ref={ref}
        >
          <h1 className="text-[#848FA1] text-[13px] capitalize z">
            {col.name}({col.Tasks.length})
          </h1>
          <div
            className="flex flex-col gap-2 mt-4 h-[90%] overflow-y-scroll"
            id="tasks_container_list"
          >
            {col.Tasks.map((task, index) => {
              const subTaskComp = task.SubTasks.filter((task) => task.complete);
              return (
                <Draggable
                  key={task.id}
                  draggableId={`${task.id}`}
                  index={index}
                >
                  {(provided) => (
                    <TaskItem
                      onClick={() => {
                        setIsOpen(true);
                        setTask(task);
                      }}
                      key={`task_${task.id}`}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      avilable={task.SubTasks.length}
                      complete={subTaskComp.length}
                      name={task.name}
                    />
                  )}
                </Draggable>
              );
            })}
          </div>
          <Modal
            isOpen={isOpen}
            close={() => {
              setTask(undefined);
              setIsOpen(false);
            }}
            className="top-0 right-0 flex justify-center place-items-center"
          >
            <MainCard ref={localRef} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl">{task?.name}</h1>
                <h4 className="text-[#848FA1] text-[12px] font-semibold capitalize z">
                  Completed (
                  {task?.SubTasks.filter((task) => task.complete).length} of{" "}
                  {task?.SubTasks.map((task) => !task.complete).length})
                </h4>
                <div className="flex flex-col gap-1">
                  {task?.SubTasks.map((subtask, index) => {
                    return (
                      <Option
                        checked={subtask.complete}
                        taskName={subtask.name}
                        taskId={subtask.id}
                        change={handleCheckChange}
                        key={index}
                      />
                    );
                  })}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold mb-2">Current status</p>
                <Select
                  onChange={(e) => {
                    handleSelectChange(e);
                  }}
                >
                  {cols.map((col, index) => {
                    return (
                      <option key={index} value={col.id} id={col.id}>
                        {col.name}
                      </option>
                    );
                  })}
                </Select>
              </div>
            </MainCard>
          </Modal>
        </div>
      </>
    );
  }
);

ColumnListItem.displayName = "ColumnListItem";
export default ColumnListItem;
