"use client";
import { ButtonHTMLAttributes, FC, ReactNode, useState } from "react";
import { signOut } from "next-auth/react";
import { BiLogOut } from "react-icons/bi";
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";

interface SignOutProps {
  Classes: string;
}

const SignOut: FC<SignOutProps> = ({ Classes }) => {
  const signOutImp = async () => {
    toast.promise(signOut({ callbackUrl: "/login" }), {
      loading: "loging out",
      success: "logged out",
      error: "error while logging out",
    });
  };
  return (
    <>
      <BiLogOut
        size={22}
        className={cn(Classes, "hover:cursor-pointer")}
        onClick={signOutImp}
      />
    </>
  );
};

export default SignOut;
