"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import Input from "@/components/ui/fields/Input";
import Label from "@/components/ui/Label";
import { v4 as uuid } from "uuid";
import Column from "@/components/ui/fields/Column";
import Button from "./ui/Button";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { data } from "autoprefixer";

interface CreateNewTaskProps {
  ref: React.MutableRefObject<HTMLDivElement | undefined>;
  cols: Column[];
  setBoard: React.Dispatch<React.SetStateAction<Board | undefined>>;
  close: () => void;
}

const CreateNewTask = React.forwardRef<HTMLDivElement, CreateNewTaskProps>(
  ({ cols, setBoard, close }, ref) => {
    const [subTasks, setSubTasks] = useState<SubTask[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<{
      currentColumn: string;
      description: string;
      name: string;
    }>({
      currentColumn: cols[0].id,
      description: "",
      name: "",
    });

    const addSub = () => {
      setSubTasks((prev) => {
        return [
          ...prev,
          {
            id: uuid(),
            name: "",
            complete: false,
          },
        ];
      });
    };
    const handleSubTaskChange = (
      id: string,
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      setSubTasks((prev) => {
        return prev.map((task) => {
          if (task.id === id) {
            return {
              ...task,
              name: e.target.value,
            };
          }
          return task;
        });
      });
    };
    const removeTask = (id: string) => {
      setSubTasks((prev) => {
        return prev.filter((task) => task.id !== id);
      });
    };
    const changeHandler = (
      e:
        | React.ChangeEvent<HTMLTextAreaElement>
        | React.ChangeEvent<HTMLSelectElement>
        | React.ChangeEvent<HTMLInputElement>
    ) => {
      setData((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    };

    const scrollRef = useRef(null);
    useEffect(() => {
      if (scrollRef.current) {
        const last = scrollRef.current.lastElementChild as HTMLDivElement;
        last?.scrollIntoView({ behavior: "smooth" });
      }
    }, [subTasks]);

    const clearState = () => {
      setData({
        currentColumn: cols[0].id,
        description: "",
        name: "",
      });
      setSubTasks([]);
    };
    const submit = () => {
      if (data.name.length === 0) {
        toast.error("name is required");
        return;
      }
      setIsLoading(true);
      axios
        .post("/api/task/create", {
          task: data,
          subTasks: subTasks,
          index: data.currentColumn,
        })
        .then((data) => {
          const act = data.data;
          setBoard((prev) => {
            return {
              ...prev,
              columns: prev?.columns.map((col) => {
                if (col.id === data.data.columnId) {
                  col.Tasks.push({ ...act, SubTasks: [] });
                }
                return col;
              }),
            };
          });

          clearState();
          close();
        })
        .catch((err) => {
          toast.error(err.response.data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    return (
      <div
        ref={ref}
        className="bg-main max-h-[90vh] overflow-y-scroll p-8 w-[30rem] rounded-md shadow-md flex flex-col gap-5"
      >
        <Toaster position="bottom-right" />
        <h1 className="text-xl font-semibold">Add new task</h1>
        <div className="flex flex-col gap-4">
          <div>
            <Input
              label="Task name"
              placeholder="e.g coffe break"
              value={data.name}
              name="name"
              onChange={(e) => {
                changeHandler(e);
              }}
            />
          </div>
          <div>
            <Label>Description</Label>
            <textarea
              cols={30}
              name="description"
              rows={10}
              value={data.description}
              onChange={(e) => {
                changeHandler(e);
              }}
              className="p-2 bg-transparent font-[500] placeholder-gray-500/70 border-[1px] text-xs pl-3 border-gray-500/40 
      rounded-md outline-none focus:ring-1 focus:ring-mainPurple h-32 w-full resize-none"
              placeholder="e.g. It's always good to take a break. This  15 minute break will  recharge the batteries  a little."
            ></textarea>
          </div>
          <div className="flex flex-col gap-1">
            <Label>Subtasks</Label>
            <div className="min-h-fit flex flex-col gap-1 overflow-y-scroll overflow-x-hidden py-1">
              {subTasks.length > 0 ? (
                subTasks.map((task, index) => {
                  return (
                    <Column
                      IoCloseOutlineClick={() => removeTask(task.id)}
                      key={index}
                      onChange={(e) => handleSubTaskChange(task.id, e)}
                      ref={scrollRef}
                    />
                  );
                })
              ) : (
                <Label className="opacity-70 text-[10px]">
                  click the button to add a sub-task
                </Label>
              )}
            </div>
            <Button size={"secondary"} variant={"secondary"} onClick={addSub}>
              + Add new sub-task
            </Button>
          </div>
          <div>
            <Label>Select column</Label>
            <select
              onChange={(e) => {
                changeHandler(e);
              }}
              id="customSel"
              name="currentColumn"
              className="p-1 bg-transparent font-[500] appearance-none placeholder-gray-500/70 border-[1px] text-xs pl-3 border-gray-500/40 rounded-md outline-none focus:ring-1 focus:ring-mainPurple h-10 w-full"
            >
              {cols.map((col, index) => {
                return (
                  <option key={index} value={col.id}>
                    {col.name}
                  </option>
                );
              })}
            </select>
          </div>
          <Button
            size={"secondary"}
            onClick={() => submit()}
            isLoading={isLoading}
          >
            Create Task
          </Button>
        </div>
      </div>
    );
  }
);
CreateNewTask.displayName = "CreateNewTask";
export default CreateNewTask;
