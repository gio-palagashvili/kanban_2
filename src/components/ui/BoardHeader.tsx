"use client";
import { FC, useRef, useState } from "react";
import Button from "./Button";
import { LuMoreVertical } from "react-icons/lu";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import axios from "axios";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import MainCard from "./cards/MainCard";

interface BoardHeaderProps {
  name?: string;
  boardId: string;
  clicked: () => void;
  editClicked: () => void;
}

const BoardHeader: FC<BoardHeaderProps> = ({
  name,
  clicked,
  boardId,
  editClicked,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [deleteModal, SetDeleteModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const ref = useRef<HTMLDivElement>(null);
  const deleteRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => {
    setIsOpen(false);
  });

  useOnClickOutside(deleteRef, () => {
    SetDeleteModal(false);
  });

  const deleteBoard = () => {
    setIsLoading(true);
    axios.delete("/api/board/delete", { data: { boardId } }).then(() => {
      setIsLoading(false);
      window.location.replace("/home");
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
            <a
              className="hover:underline text-left"
              onClick={() => editClicked()}
            >
              Edit board
            </a>
            <a
              className="text-red-500 mt-auto hover:underline text-left"
              onClick={() => SetDeleteModal(true)}
            >
              Delete board
            </a>
          </div>
        </button>
      </div>
      <Modal
        isOpen={deleteModal}
        close={() => SetDeleteModal(false)}
        className="top-0 right-0 flex justify-center place-items-center"
      >
        <MainCard ref={deleteRef}>
          <h1 className="text-lg text-red-500 font-bold">Delete this board?</h1>
          <p className="text-[13px] mt-2 font-medium text-mainText">
            Are you sure you want to delete the &quot;{name}&quot; board? This
            action will remove all columns and tasks and cannot be reversed.
          </p>
          <div className="flex gap-2">
            <Button
              variant={"warning"}
              size={"secondary"}
              className="w-1/2"
              isLoading={isLoading}
              onClick={() => deleteBoard()}
            >
              Delete
            </Button>
            <Button
              variant={"secondary"}
              size={"secondary"}
              className="w-1/2"
              onClick={() => SetDeleteModal(false)}
            >
              Cancel
            </Button>
          </div>
        </MainCard>
      </Modal>
    </div>
  );
};

export default BoardHeader;
