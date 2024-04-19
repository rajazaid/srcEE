"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useClerk } from "@clerk/nextjs";

const SidebarLinks = ({ page }: { page: "admin" | "doctor" }) => {
  const pathname = usePathname();
  const { signOut } = useClerk();
  const router = useRouter();
  return (
    <div className="mt-6">
      <div>
        <h3 className="text-xs tracking-tight text-gray-300 font-medium">
          All Pages
        </h3>
        <div className="mt-3 text-sm">
          {(page === "admin" || page === "doctor") && (
            <Link href={`/${page}/dashboard`}>
              <div
                className={`w-full ${
                  pathname === `/${page}/dashboard` && "bg-[#2F374B]"
                } text-white mt-2 transition-all duration-200 ease-in-out hover:bg-[#2F374B] rounded-md`}
              >
                <button className="w-full py-3 px-4 flex items-center gap-2">
                  <AiOutlineLayout />
                  <span>Dashboard</span>
                </button>
              </div>
            </Link>
          )}
          <Link href={`/${page}/users`}>
            <div
              className={`w-full ${
                pathname === `/${page}/users` && "bg-[#2F374B]"
              } text-white mt-2 transition-all duration-200 ease-in-out hover:bg-[#2F374B] rounded-md`}
            >
              <button className="w-full py-3 px-4 flex items-center gap-2">
                <AiOutlineUser />
                <span>All Users</span>
              </button>
            </div>
          </Link>
          {page === "doctor" && (
            <Link href="/doctor/my-patients">
              <div
                className={`w-full ${
                  pathname === "/doctor/my-patients" && "bg-[#2F374B]"
                } mt-2 text-white transition-all duration-200 ease-in-out hover:bg-[#2F374B] rounded-md`}
              >
                <button className="w-full py-3 px-4 flex items-center gap-2">
                  <AiOutlineControl />
                  <span>My Patients</span>
                </button>
              </div>
            </Link>
          )}
          {page === "admin" && (
            <Link href="/admin/doctors">
              <div
                className={`w-full ${
                  pathname === "/admin/doctors" && "bg-[#2F374B]"
                } mt-2 text-white transition-all duration-200 ease-in-out hover:bg-[#2F374B] rounded-md`}
              >
                <button className="w-full py-3 px-4 flex items-center gap-2">
                  <AiOutlineControl />
                  <span>Doctors</span>
                </button>
              </div>
            </Link>
          )}
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-xs tracking-tight text-gray-300 font-medium">
          User
        </h3>
        <div className="mt-3 text-sm">
          <Link href={`/${page}/settings`}>
            <div
              className={`w-full ${
                pathname === `/${page}/settings` && "bg-[#2F374B]"
              } text-white mt-2 transition-all duration-200 ease-in-out hover:bg-[#2F374B] rounded-md`}
            >
              <button className="w-full py-3 px-4 flex items-center gap-2">
                <AiOutlineSetting />
                <span>Settings</span>
              </button>
            </div>
          </Link>
          <Link href={`/${page}/help`}>
            <div
              className={`w-full ${
                pathname === `/${page}/help` && "bg-[#2F374B]"
              } text-white mt-2 transition-all duration-200 ease-in-out hover:bg-[#2F374B] rounded-md`}
            >
              <button className="w-full py-3 px-4 flex items-center gap-2">
                <MdOutlineHelp />
                <span>Help</span>
              </button>
            </div>
          </Link>
          <div
            className={`w-full  mt-2 text-white transition-all duration-200 ease-in-out hover:bg-[#2F374B] rounded-md`}
          >
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="w-full py-3 px-4 flex items-center gap-2">
                  <AiOutlineLogout />
                  <span>Logout</span>
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent className="border-none outline-none">
                <AlertDialogHeader>
                  <AlertDialogTitle>Do you want to logout?</AlertDialogTitle>
                  
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => signOut(()=> router.push('/login'))}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarLinks;
