import Image from "next/image";
import React from "react";
import {
  AiOutlineControl,
  AiOutlineDashboard,
  AiOutlineLayout,
  AiOutlineLogout,
  AiOutlineSetting,
  AiOutlineUser,
} from "react-icons/ai";
import { MdOutlineHelp } from "react-icons/md";
import Logo from "../../../public/images/admin-logo.jpg";
import SidebarLinks from "@/app/_components/SidebarLinks";
import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const DoctorLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { sessionClaims } = auth();
  if (sessionClaims?.role !== "doctor") {
    return (
      <div className="p-4 text-xl text-red-300">
        Unauthorized access, you have to be an admin to access this page!
        <p className="text-neutral-300 text-sm">If you are an admin then click below to get redirected to the admin page.</p>
        <Link href="/admin"><Button className="mt-2 bg-secondary">I am an Admin</Button></Link>
      </div>
    );
  } else
    return (
      <div className=" bg-primary min-h-screen grid grid-cols-8 gap-0 md:gap-4">
        <section className="md:col-span-2 col-span-8 py-6 px-3 w-full relative bg-secondary">
          <main className="sticky top-6">
            <div className="flex items-center gap-3">
            <div className="">
                <UserButton />
              </div>
            </div>

            <SidebarLinks page="doctor" />
          </main>
        </section>
        <section className="md:col-span-6 md:m-0 mx-4 md:rounded-none rounded-lg my-4 col-span-8 bg-secondary py-6 px-7">
          {children}
        </section>
      </div>
    );
};

export default DoctorLayout;
