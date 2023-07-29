"use client";
import React, { RefObject, useEffect, useRef, useState } from "react";
import Button from "./ui/Button";
import Input from "./ui/fields/Input";
import { v4 as uuid } from "uuid";
import { Toaster, toast } from "react-hot-toast";
import Label from "./ui/Label";
import axios from "axios";
import Column from "./ui/fields/Column";
// import { Board } from "@/types/db";

interface CreateNewBoardProps {
  ref: RefObject<HTMLDivElement>;
  close: () => void;
  setBoards: React.Dispatch<React.SetStateAction<Board[]>>;
}

const CreateNewBoard = React.forwardRef<HTMLDivElement, CreateNewBoardProps>(
  ({ close, setBoards }, ref) => {
    const scrollRef = useRef(null);
    const [name, setName] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [Cols, SetCols] = useState([
      { id: uuid(), value: "todo" },
      { id: uuid(), value: "doing" },
    ]);

    useEffect(() => {
      if (scrollRef.current) {
        const last = scrollRef.current.lastElementChild as HTMLDivElement;
        last?.scrollIntoView({ behavior: "smooth" });
      }
    }, [Cols]);

    const changeCol = (e: React.ChangeEvent<HTMLInputElement>, i: string) => {
      SetCols((prev) => {
        return prev.map((col) => {
          if (col.id === i) {
            return { ...col, value: e.target.value };
          }
          return col;
        });
      });
    };
    const createCol = () => {
      SetCols((prev) => {
        return [...prev, { id: uuid(), value: "" }];
      });
    };
    const removeCol = (i: string) => {
      SetCols((prevCols) => prevCols.filter((col) => col.id !== i));
    };

    const sub = () => {
      if (name.length === 0) {
        toast.error("name can't be empty");
        return;
      }
      setIsLoading(true);
      axios
        .post("/api/board/create", {
          name: name,
          cols: Cols,
        })
        .then((data) => {
          toast.success("created successfully");
          setBoards((prev) => {
            return [...prev, data.data];
          });
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
        className="bg-main w-[30rem] min-h-[25rem] overflow-y-scroll rounded-md p-8 flex flex-col gap-5"
        ref={ref}
      >
        <Toaster position="bottom-right" />
        <h1 className="text-xl">Add new board</h1>
        <div className="flex flex-col gap-3">
          <div className="w-full">
            <Input
              label="Board name"
              placeholder="e.g. web design"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <Label className="mt-2">Board Columns</Label>
          <div className="w-full flex flex-col gap-2 h-fit py-1 max-h-[7rem] overflow-y-scroll overflow-x-hidden">
            {Cols.length === 0 ? (
              <Label className="opacity-70">No columns</Label>
            ) : (
              Cols.map((col) => {
                return (
                  <div key={col.id} ref={scrollRef}>
                    <Column
                      className="ml-[1px]"
                      IoCloseOutlineClick={() => removeCol(col.id)}
                      onChange={(e) => changeCol(e, col.id)}
                    />
                  </div>
                );
              })
            )}
          </div>
          <div className="">
            <Button
              size={"secondary"}
              variant={"secondary"}
              onClick={() => createCol()}
            >
              + Add new column
            </Button>
            <Button
              className="w-full mt-4 h-10 font-[500] text-sm"
              variant={"main"}
              isLoading={isLoading}
              onClick={sub}
            >
              Create new board
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

CreateNewBoard.displayName = "CreateNewBoard";
export default CreateNewBoard;