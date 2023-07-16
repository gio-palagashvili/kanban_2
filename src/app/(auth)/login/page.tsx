"use client";
import { FC, useState } from "react";
import { signIn } from "next-auth/react";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import { Toaster, toast } from "react-hot-toast";
import { AiOutlineGoogle } from "react-icons/ai";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const signInWithGoogle = async () => {
    toast.promise(
      signIn("google"),
      {
        error: (e) => `${e.error}`,
        loading: "Redirecting",
        success: "",
      },
      {
        success: {
          style: {
            display: "none",
          },
        },
      }
    );
  };

  return (
    <div className="w-[100vw] h-[100vh] flex place-items-center justify-center">
      <Toaster position="bottom-right" />
      <div className="w-1/2 flex justify-center place-items-center gap-4 flex-col">
        <div className="flex justify-center place-items-center gap-4 md:place-items-baseline">
          <Logo Open={false} setOpen={() => {}} />
        </div>
        <Button
          onClick={signInWithGoogle}
          className="rounded-lg flex w-1/3"
          size={"medium"}
        >
          <AiOutlineGoogle size={25} className="mr-2" />
          <span className="flex-1 text-center">Login with Google</span>
        </Button>
      </div>
    </div>
  );
};

export default page;
