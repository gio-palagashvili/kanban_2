"use client";
import BoardHeader from "@/components/ui/BoardHeader";
import CreateNewTask from "@/components/ui/CreateNewTask";
import Modal from "@/components/ui/Modal";
import { useOnClickOutside } from "@/hooks/useClickOutside";
import axios from "axios";
import { redirect } from "next/navigation";
import { FC, useEffect, useRef, useState } from "react";
import ColumnListItem from "@/components/list/ColumnListItem";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface pageProps {
  params: {
    boardId: string;
  };
}

const page: FC<pageProps> = ({ params }) => {
  const { boardId } = params;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [board, setBoard] = useState<Board>();
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => {
    setIsOpen(false);
  });

  // const [board, setBoard] = useState<Board>({
  //   id: "2",
  //   columns: [
  //     {
  //       id: "z",
  //       name: "todo",
  //       Tasks: [
  //         {
  //           id: "2",
  //           name: "lala",
  //           SubTasks: [
  //             { id: "1", name: "bruh", complete: false },
  //             { id: "2", name: "bruh", complete: true },
  //           ],
  //         },
  //         {
  //           id: "3",
  //           name: "smoke that wee",
  //           SubTasks: [],
  //         },
  //       ],
  //     },
  //     {
  //       id: "k",
  //       name: "todo",
  //       Tasks: [
  //         {
  //           id: "4",
  //           name: "do the thng",
  //           SubTasks: [],
  //         },
  //       ],
  //     },
  //     { id: "a", name: "done", Tasks: [] },
  //   ],
  //   name: "test",
  //   userId: "1",
  // });

  useEffect(() => {
    axios
      .get(`/api/board/${boardId}`)
      .then((data) => {
        setBoard(data.data);
      })
      .catch(() => {
        redirect("/home");
      });
  }, []);

  return (
    <div className="h-full flex flex-col w-full overflow-scroll">
      <BoardHeader
        name={!board ? "loading..." : board.name}
        clicked={() => setIsOpen(true)}
      />
      <div className="flex p-6 gap-4 h-[90%] overflow-scroll">
        <DragDropContext onDragEnd={(res) => console.log(res)}>
          {board?.columns.map((col) => {
            return <ColumnListItem col={col} key={col.id} />;
          })}
        </DragDropContext>
        <div className="bg-main/20 rounded-md flex-none w-[20rem] flex justify-center place-items-center text-mainText hover:text-mainPurple cursor-pointer">
          <h1 className="text-2xl font-semibold capitalize">+ New column</h1>d
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        className="left-0 top-0 h-[100vh] flex place-items-center justify-center"
        close={() => setIsOpen(false)}
      >
        {board?.columns ? (
          <CreateNewTask
            ref={ref}
            cols={board.columns}
            setBoard={setBoard}
            close={() => setIsOpen(false)}
          />
        ) : (
          ""
        )}
      </Modal>
    </div>
  );
};

export default page;
