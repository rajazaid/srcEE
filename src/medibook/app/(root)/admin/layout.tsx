import React from "react";
import DashboardLinks from "@/app/_components/SidebarLinks";
import { UserButton, auth, clerkClient } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const AdminLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { sessionClaims } = auth();
  if (sessionClaims?.role !== "admin") {
    return (
      <div className="p-4 text-xl text-red-300">
        Unauthorized access, you have to be an admin to access this page!
        <p className="text-neutral-300 text-sm">
          If you are a doctor then click below to get redirected to the doctor page.
        </p>
        <Link href="/doctor">
          <Button className="mt-2 bg-secondary">I am a Doctor</Button>
        </Link>
      </div>
    );
  } else
    return (
      <div className="bg-primary min-h-screen grid grid-cols-8 gap-0 md:gap-4">
        <section className="md:col-span-2 col-span-8 py-6 px-3 w-full bg-secondary flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <img src="/images/medibook.png" alt="MediBook" className="w-8 h-8 mr-2" />
              <h1 className="text-white font-bold text-lg">MediBook</h1>
            </div>
          </div>
          <main className="flex-1">
            <DashboardLinks page="admin" />
          </main>
          <div className="pb-6 absolute bottom-0 w-full">
            <UserButton />
          </div>
        </section>
        <section className="md:col-span-6 md:m-0 mx-4 md:rounded-none rounded-lg my-4 col-span-8 bg-secondary py-6 px-7">
          {children}
        </section>
      </div>
    );
};

export default AdminLayout;
