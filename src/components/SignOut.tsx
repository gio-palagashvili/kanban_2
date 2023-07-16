"use client";
import { ButtonHTMLAttributes, FC, ReactNode, useState } from "react";
import { signOut } from "next-auth/react";
import { BiLogOut } from "react-icons/bi";
import { ClassValue } from "clsx";
import { cn } from "@/lib/utils";
import { Toaster, toast } from "react-hot-toast";

interface SignOutProps {
  Classes: string;
}

const SignOut: FC<SignOutProps> = ({ Classes }) => {
  const signOutImp = async () => {
    signOut({ callbackUrl: "/login" });
    toast.promise(signOut({ callbackUrl: "/login" }), {
      loading: "loging out",
      success: "logged out",
      error: "error while logging out",
    });
  };
  return (
    <>
      <Toaster position="bottom-right" />
      <BiLogOut
        size={22}
        className={cn(Classes, "hover:cursor-pointer")}
        onClick={signOutImp}
      />
    </>
  );
};

export default SignOut;
