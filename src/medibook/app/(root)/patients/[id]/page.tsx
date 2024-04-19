import React from "react";
import Profile from "../../../../public/images/profile.jpg";
import Image from "next/image";
import UserAccount from "@/components/shared/UserPage";
import { getPatientById } from "@/lib/actions/patients.actions";
import { AiOutlineLogout } from "react-icons/ai";
import { SignOutButton, UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Patient = async ({ params }: { params: { id: string } }) => {
  const id = params.id as string;
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  if (id !== userId) {
      return (
          <div>
        <p>UnAuthorized access!</p>
        <p>Please sign in with right credentials</p>
        <Link className="" href="/login">
          <Button className="bg-secondary mt-3 hover:bg-[#2F374B]">Login</Button>
        </Link>
    </div>
)
}
 const user = await getPatientById(id);
  console.log(user);
  
  if (!user.success) {
    return (
      <div>
        <p>You have entered a wrong link</p>
        <Link className="" href="/login">
          <Button className="bg-secondary hover:bg-[#2F374B]">Login</Button>
        </Link>
        <Link className="" href="/signup">
          <Button className="bg-secondary hover:bg-[#2F374B]">Signup</Button>
        </Link>
      </div>
    );
  }
  const userRole = user?.data.role;
  const joinedDate = new Date(user.data.createdat).toLocaleString("en-US", {
    day: "numeric",
    year: "numeric",
    month: "short",
  });
  return (
    <div className="max-w-7xl mx-auto w-[90%] min-h-screen grid grid-cols-4 py-8 gap-4">
      <section className="col-span-4 md:col-span-1 flex flex-col gap-4 ">
        <div className="bg-secondary rounded-lg px-6  py-6">
          <div>
            <UserButton />
          </div>
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <p className="text-2xl">
                {user.data.firstname} {user.data.lastname}
              </p>
              <SignOutButton>
                <AiOutlineLogout className="cursor-pointer" />
              </SignOutButton>
            </div>
            <div className="flex mt-2 items-center flex-wrap justify-between text-xs">
              <p className="text-green-400 ">Active</p>
              <p className="text-neutral-300">Joined {joinedDate}</p>
            </div>
            <div className="mt-4 md:text-sm lg:text-base text-neutral-300 flex flex-col gap-3">
              <div className="flex flex-wrap items-center justify-between">
                <p className="text-white">Gender</p>
                <p>Male</p>
              </div>
              <div className="flex flex-wrap items-center justify-between">
                <p className="text-white">Language</p>
                <p>English</p>
              </div>
              <div className="flex flex-wrap items-center justify-between">
                <p className="text-white">Age</p>
                <p>{user?.data.age || "N/A"}</p>
              </div>
              <div className="flex flex-wrap items-center justify-between">
                <p className="text-white">Height</p>
                <p>5" 9'</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-secondary flex-1 rounded-lg">
          <div className="bg-secondary rounded-lg px-6 py-3">
            <h3 className="text-xl">Complications</h3>
            <div className="mt-4 md:text-sm lg:text-base text-neutral-300 flex flex-col gap-3">
              <div className="flex flex-wrap items-center justify-between">
                <p className="text-white">Diabetes</p>
                <p className="text-red-500">High</p>
              </div>
              <div className="flex flex-wrap items-center justify-between">
                <p className="text-white">Sugar</p>
                <p className="text-yellow-400">Medium</p>
              </div>
              <div className="flex flex-wrap items-center justify-between">
                <p className="text-white">Fatty Liver</p>
                <p className="text-green-400">Low</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="col-span-4 md:col-span-3 rounded-lg bg-secondary py-6 px-6">
        <UserAccount user={user.data} />
      </section>
    </div>
  );
};

export default Patient;
