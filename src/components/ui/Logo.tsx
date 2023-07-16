import { FC } from "react";
import logo from "@/assets/logo.svg";
import Image from "next/image";
import chevron from "@/assets/chevron.svg";

type LogoProps = {} & (
  | { setOpen: React.Dispatch<React.SetStateAction<boolean>>; Open: boolean }
  | { setOpen: () => void; Open: false }
);

const Logo: FC<LogoProps> = ({ setOpen, Open }) => {
  return (
    <>
      <Image src={logo} alt="" className="self-center" />
      <h1 className="font-bold text-xl md:before:content-['Kanban'] md:text-3xl flex justify-center place-items-center gap-2 before:content-['Board_name']">
        <button onClick={() => setOpen((prev) => !prev)} className="md:hidden">
          <Image
            src={chevron}
            alt="chevron"
            className={!Open ? "rotate-180 duration-200" : "duration-200"}
          />
        </button>
      </h1>
    </>
  );
};

export default Logo;
