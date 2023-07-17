"use client";
import BoardHeader from "@/components/ui/BoardHeader";
import TaskItem from "@/components/ui/TaskItem";
import axios from "axios";
import { redirect } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface pageProps {
  params: {
    boardId: string;
  };
}

const page: FC<pageProps> = ({ params }) => {
  const { boardId } = params;
  const [board, setBoard] = useState<Board>({
    id: "2",
    columns: [
      { id: "z", name: "todo", Tasks: [] },
      { id: "k", name: "todo", Tasks: [] },
      { id: "a", name: "done", Tasks: [] },
    ],
    name: "test",
    userId: "1",
  });

  // useEffect(() => {
  //   axios
  //     .get(`/api/board/${boardId}`)
  //     .then((data) => {
  //       setBoard(data.data);
  //     })
  //     .catch(() => {
  //       redirect("/home");
  //     });
  // }, []);

  // todo fix scroll

  return (
    <div className="w-full">
      <BoardHeader name={!board ? "loading..." : board.name} />
      <div className="flex p-6 gap-4 overflow-scroll max-w-full h-[90%]">
        {board?.columns.map((col) => {
          return (
            <div key={col.id} className="w-[20rem]">
              <h1 className="text-[#848FA1] text-[13px] capitalize z">
                {col.name}({col.Tasks.length})
              </h1>
              <div className="flex flex-col gap-2 mt-4" id="task_container">
                <TaskItem avilable={0} complete={0} name="Task name" />
              </div>
            </div>
          );
        })}
        <div className="bg-main/20 rounded-md w-[20rem] flex justify-center place-items-center text-mainText hover:text-mainPurple cursor-pointer">
          <h1 className="text-2xl font-semibold capitalize">+ New column</h1>
        </div>
      </div>
    </div>
  );
};

export default page;
