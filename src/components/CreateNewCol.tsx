import React, { useState } from "react";
import Input from "@/components/ui/fields/Input";
import Button from "@/components/ui/Button";
import axios from "axios";

interface CreateNewColProps {
  ref: React.MutableRefObject<HTMLDivElement>;
  close: () => void;
  boardId: string;
  addNewColumn: (col: Column) => void;
}

const CreateNewCol = React.forwardRef<HTMLDivElement, CreateNewColProps>(
  ({ close, boardId, addNewColumn }, ref) => {
    const [data, setData] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const submit = () => {
      if (data.length === 0) {
        document.getElementById("inputMain")?.classList.add("border-red-500");
        return;
      }
      setIsLoading(true);
      document.getElementById("inputMain")?.classList.remove("border-red-500");
      axios
        .post("/api/column/create", {
          data,
          boardId,
        })
        .then((col) => {
          addNewColumn(col.data);
        })
        .finally(() => {
          setIsLoading(false);
          setData("");
          close();
        });
    };

    return (
      <div
        className="bg-main max-h-[90vh] p-8 w-[30rem] rounded-md shadow-md flex flex-col"
        ref={ref}
      >
        <Input
          label="Column name"
          placeholder="todo"
          value={data}
          id="inputMain"
          className="outline-none"
          onChange={(e) => {
            setData(e.target.value);
          }}
        />
        <Button
          variant={"main"}
          isLoading={isLoading}
          size={"full"}
          className="p-2 mt-2"
          onClick={submit}
        >
          Create
        </Button>
      </div>
    );
  }
);

CreateNewCol.displayName = "CreateNewCol";
export default CreateNewCol;
