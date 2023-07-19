"use client";
import { FC, useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { Board as BoardUi } from "./ui/Board";
import { LuMoreVertical } from "react-icons/lu";
// import { useOnClickOutside } from "@/hooks/useClickOutside";
import Logo from "./ui/Logo";
import { Session } from "next-auth";
import SignOut from "./SignOut";
import Modal from "./ui/Modal";
import CreateNewBoard from "./ui/CreateNewBoard";
import axios from "axios";
// import { Board } from "@/types/db";
import Label from "./ui/Label";
import { usePathname, useRouter } from "next/navigation";
import { useOnClickOutside } from "@/hooks/useClickOutside";
import { toast } from "react-hot-toast";

interface NavProps {
  session: Session;
}

const Nav: FC<NavProps> = ({ session }) => {
  const [Open, setOpen] = useState<boolean>(false);
  const [openBoard, setOpenBoard] = useState<boolean>(false);
  const [boards, setBoards] = useState<Board[]>([]);
  const { push } = useRouter();
  const path = usePathname();

  const ref = useRef<HTMLDivElement>(null);
  const refBoard = useRef<HTMLDivElement>(null);

  useOnClickOutside(refBoard, () => {
    setOpenBoard(false);
  });

  useOnClickOutside(ref, () => {
    setOpen(false);
  });

  const clearState = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setOpenBoard(false);
      }
    };
    visualViewport!.addEventListener("resize", clearState);
    document.addEventListener("keydown", handleKeyDown);
    axios
      .post("/api/user/boards", {})
      .then((response) => {
        const data = response.data as Board[];
        setBoards(data);
      })
      .catch((err) => {
        toast.error("couldn't get boards");
      });

    return () => {
      visualViewport!.removeEventListener("resize", clearState);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <div className="flex p-3 bg-main min-w-[100vw] h-14 md:h-[100vh] md:min-w-[18rem] md:w-[18rem] md:flex-col md:p-0 md:gap-12 sticky">
        <div className="w-1/2 flex place-items-center gap-4 md:place-items-baseline md:pl-6 md:pt-6 ">
          <Logo setOpen={setOpen} Open={Open} />
        </div>
        <div
          className={
            Open
              ? "bg-black/50 w-[100vw] h-[100vh] absolute z-10 m-[-12px]"
              : ""
          }
        >
          <div
            ref={ref}
            className={
              Open
                ? "flex z-20 flex-col nav p-4 shadowbox md:w-full md:p-0 absolute w-[90%] bg-main rounded-lg left-1/2 transform -translate-x-1/2 top-[10vh]"
                : "hidden flex-col nav md:w-full md:p-0 md:flex"
            }
          >
            <div className="">
              <p className="text-[#848FA1] text-[13px] uppercase pl-6 z">
                All boards (3)
              </p>
            </div>
            <div className="boards flex flex-col font-bold overflow-y-scroll max-h-[353px] mt-2">
              {boards.length >= 1 ? (
                boards.map((board, index) => {
                  if (path.split("/")[2] == board.id) {
                    return (
                      <BoardUi
                        variant={"selected"}
                        text={board.name}
                        key={index}
                      />
                    );
                  }
                  return (
                    <BoardUi
                      variant={"default"}
                      text={board.name}
                      key={index}
                      onClick={() => push(`/home/board/${board.id}`)}
                    />
                  );
                })
              ) : (
                <Label className="pl-6">Create a board to get started</Label>
              )}
            </div>
            <BoardUi
              onClick={() => {
                setOpenBoard(true);
              }}
              variant={"new"}
              text="+ Create a new board"
              fill="#635fc7"
            />
          </div>
        </div>
        <Modal
          isOpen={openBoard}
          close={() => setOpenBoard(false)}
          className="top-0 md:left-0 -left-6 flex justify-center place-items-center"
        >
          <CreateNewBoard
            ref={refBoard}
            setBoards={setBoards}
            close={() => setOpenBoard(false)}
          />
        </Modal>
        <div className="w-1/2 flex justify-end pr-3 gap-3 md:hidden">
          <Button variant={"main"} size={"small"} extra={"plus"}>
            +
          </Button>
          <button>
            <LuMoreVertical
              size={25}
              className="ml-auto opacity-60 cursor-pointer"
            />
          </button>
        </div>
        <div
          id="user"
          className="flex gap-2 md:mt-auto md:p-5 justify-center place-items-center md:justify-normal"
        >
          {session ? (
            <>
              <div className="h-10 w-10 relative rounded-full mt-1">
                <Image
                  referrerPolicy="no-referrer"
                  className="rounded-full"
                  placeholder="empty"
                  fill={true}
                  sizes="2.25rem"
                  src={session.user.image as string}
                  alt="Your profile picture"
                />
              </div>
              <div className="hidden md:block">
                <h1 className="">{session.user.name}</h1>
                <p className="text-[11px] text-[#A29C91] font-light leading-[8px]">
                  {session.user.email}
                </p>
              </div>
              <SignOut Classes="ml-auto mt-1" />
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Nav;
