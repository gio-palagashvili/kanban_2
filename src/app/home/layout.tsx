import Nav from "@/components/Nav";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { FC, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = async ({ children }) => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <div className="w-[100vw] h-[100vh] flex">
      <Nav session={session} />
      {children}
    </div>
  );
};

export default Layout;
