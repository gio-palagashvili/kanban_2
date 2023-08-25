"use client";
import BoardHeader from "@/components/ui/BoardHeader";
import CreateNewTask from "@/components/CreateNewTask";
import Modal from "@/components/ui/Modal";
import { useOnClickOutside } from "@/hooks/useClickOutside";
import axios from "axios";
import { redirect } from "next/navigation";
import { FC, useEffect, useRef, useState } from "react";
import ColumnListItem from "@/components/list/ColumnListItem";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import CreateNewCol from "@/components/CreateNewCol";

interface pageProps {
  params: {
    boardId: string;
  };
}

const page: FC<pageProps> = ({ params }) => {
  const { boardId } = params;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openCreateCol, setOpenCreateCol] = useState<boolean>(false);
  const [board, setBoard] = useState<Board>();
  const ref = useRef<HTMLDivElement>(null);
  const refCol = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => {
    setIsOpen(false);
  });
  useOnClickOutside(refCol, () => {
    setOpenCreateCol(false);
  });

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

  const handleDrag = (res: DropResult) => {
    const colIndexSrc: number = parseInt(res.source.droppableId.split("_")[1]);
    const colIndexDest: number = res.destination
      ? parseInt(res.destination.droppableId.split("_")[1])
      : -1;
    const taskIndexSrc = res.source.index;
    const taskIndexDest = res.destination!.index;

    if (
      colIndexSrc !== colIndexDest &&
      colIndexDest !== undefined &&
      taskIndexSrc !== undefined &&
      taskIndexDest !== undefined &&
      board &&
      board.columns[colIndexDest] &&
      board.columns[colIndexSrc]
    ) {
      const movedTask = board.columns[colIndexSrc].Tasks[taskIndexSrc];
      const failSafe: Board = { ...board };

      const updatedSourceTasks = Array.from(board.columns[colIndexSrc].Tasks);
      updatedSourceTasks.splice(taskIndexSrc, 1);

      const updatedDestinationTasks = Array.from(
        board.columns[colIndexDest].Tasks
      );
      updatedDestinationTasks.splice(taskIndexDest, 0, movedTask);

      const updatedSourceColumn = {
        ...board.columns[colIndexSrc],
        Tasks: updatedSourceTasks,
      };

      const updatedDestinationColumn = {
        ...board.columns[colIndexDest],
        Tasks: updatedDestinationTasks,
      };

      const updatedColumns = board.columns.map((col, index) =>
        index === colIndexSrc
          ? updatedSourceColumn
          : index === colIndexDest
          ? updatedDestinationColumn
          : col
      );

      const updatedBoard = {
        ...board,
        columns: updatedColumns,
      };
      const destTask =
        board.columns[colIndexDest].Tasks[res.destination!.index];

      axios
        .post("/api/task/move", {
          board: updatedBoard,
          task: movedTask,
          domestic: false,
          drag: res,
          draggedDest: destTask,
        })
        .catch((err) => {
          setBoard(failSafe);
        });

      setBoard(updatedBoard);
    } else if (
      colIndexSrc === colIndexDest &&
      taskIndexSrc !== undefined &&
      taskIndexDest !== undefined &&
      board &&
      board.columns[colIndexSrc]
    ) {
      const failSafe: Board = { ...board };
      const updatedTasks = Array.from(board.columns[colIndexSrc].Tasks);
      const movedTask = updatedTasks.splice(taskIndexSrc, 1)[0];
      updatedTasks.splice(taskIndexDest, 0, movedTask);

      const updatedColumn = {
        ...board.columns[colIndexSrc],
        Tasks: updatedTasks,
      };

      const updatedColumns = board.columns.map((col, index) =>
        index === colIndexSrc ? updatedColumn : col
      );
      const updatedBoard = {
        ...board,
        columns: updatedColumns,
      };
      setBoard(updatedBoard);

      axios
        .post("/api/task/move", {
          board: updatedBoard,
          task: movedTask,
          destColId: "",
          domestic: true,
          drag: res,
          draggedDestId: board.columns[colIndexSrc].Tasks[taskIndexDest],
        })
        .catch((err) => {
          setBoard(failSafe);
        });
    }
  };

  const addNewColumn = (col: Column) => {
    setBoard((prev) => {
      return { ...prev, columns: [...prev!.columns, col] };
    });
  };

  return (
    <div className="h-full flex flex-col w-full overflow-scroll">
      <BoardHeader
        name={!board ? "loading..." : board.name}
        boardId={boardId}
        clicked={() => setIsOpen(true)}
      />
      <div className="flex p-6 gap-4 h-[90%] overflow-scroll ">
        <DragDropContext onDragEnd={(e) => handleDrag(e)}>
          {board?.columns.map((col, index) => {
            return (
              <Droppable
                droppableId={`${col.id}_${index}`}
                key={`dropable_${col.id}`}
              >
                {(provided) => (
                  <ColumnListItem
                    col={col}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  />
                )}
              </Droppable>
            );
          })}
        </DragDropContext>
        <button
          onClick={() => setOpenCreateCol(true)}
          className="bg-main/20 rounded-md flex-none w-[20rem] flex justify-center place-items-center text-mainText hover:text-mainPurple cursor-pointer"
        >
          <h1 className="text-2xl font-semibold capitalize">+ New column</h1>
        </button>
      </div>
      <Modal
        isOpen={openCreateCol}
        close={() => setOpenCreateCol(false)}
        className="left-0 top-0 h-[100vh] flex place-items-center justify-center"
      >
        <CreateNewCol
          ref={refCol}
          addNewColumn={addNewColumn}
          close={() => setOpenCreateCol(false)}
          boardId={boardId}
        />
      </Modal>
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
