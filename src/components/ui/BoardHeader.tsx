"use client";
import { FC, useRef, useState } from "react";
import Button from "./Button";
import { LuMoreVertical } from "react-icons/lu";
import { useOnClickOutside } from "@/hooks/useClickOutside";
import axios from "axios";
import { useRouter } from "next/navigation";

interface BoardHeaderProps {
  name?: string;
  boardId: string;
  clicked: () => void;
}

const BoardHeader: FC<BoardHeaderProps> = ({ name, clicked, boardId }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
    setIsOpen(false);
  });

  const deleteBoard = () => {
    axios.delete("/api/board/delete", { data: { boardId } }).then(() => {
      router.push("/home");
    });
  };

  return (
    <div className="bg-main h-20 w-full hidden md:flex px-4 justify-between place-items-center">
      <h1 className="text-[22px] font-semibold">{name}</h1>
      <div className="flex justify-center place-items-center gap-3">
        <Button size={"medium"} className="capitalize" onClick={clicked}>
          + add new Task
        </Button>
        <button className="relative" onClick={toggleDropdown}>
          <LuMoreVertical
            size={25}
            className="ml-auto opacity-60 cursor-pointer"
          />
          <div
            ref={ref}
            className={
              isOpen
                ? "absolute text-[13px] bg-[#20212c] w-36 h-[5.5rem] flex flex-col gap-2 text-left text-mainText font-[500] right-3 mt-5 p-4 shadowbox rounded-md"
                : "hidden"
            }
          >
            <a className="hover:underline text-left">Edit board</a>
            <a
              className="text-red-500 mt-auto hover:underline text-left"
              onClick={() => deleteBoard()}
            >
              Delete board
            </a>
          </div>
        </button>
      </div>
    </div>
  );
};

export default BoardHeader;
