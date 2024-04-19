import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Button } from "../ui/button";
import { UpdatePatientProp } from "@/lib/types";

const UserAccount = ({user}:{user:UpdatePatientProp}) => {
  return (
    <div>
      <Tabs defaultValue="general" className="">
                <div className="overflow-x-auto overflow-y-hidden">
                <TabsList className=" gap-3">
                    <TabsTrigger className="flex-1 p-3 data-[state=inactive]:bg-[#2F374B]" value="general">General</TabsTrigger>
                    <TabsTrigger className="flex-1 p-3 data-[state=inactive]:bg-[#2F374B]" value="appointments">Appointments</TabsTrigger>
                    <TabsTrigger className="flex-1 p-3 data-[state=inactive]:bg-[#2F374B]" value="notes">Notes</TabsTrigger>
                    <TabsTrigger className="flex-1 p-3 data-[state=inactive]:bg-[#2F374B]" value="medications">Medications</TabsTrigger>
                    <TabsTrigger className="flex-1 p-3 data-[state=inactive]:bg-[#2F374B]" value="logs">Logs</TabsTrigger>
                </TabsList>
                </div>
        <div className="mt-4">
            <TabsContent value="general" className="py-4">
                <h3 className="text-lg text-gray-300">Personal Details</h3>
                <hr className="mt-3 border-neutral-400 " />
                <div className="mt-3 md:text-sm lg:text-base flex-wrap flex gap-12 items-center">
                    <div>
                        <p className="text-neutral-400">First Name</p>
                        <p>{user.firstname}</p>
                    </div><div>
                        <p className="text-neutral-400">Last Name</p>
                        <p>{user.lastname}</p>
                    </div><div>
                        <p className="text-neutral-400">Birth Date</p>
                        <p>12/04/1996</p>
                    </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-12 items-center">
                    <div>
                        <p className="text-neutral-400">Address</p>
                        <p>123 Elm Street, Springfield, Anytown 12345, United States</p>
                    </div><div>
                        <p className="text-neutral-400">Phone</p>
                        <p>555-123-4567</p>
                    </div><div>
                        <p className="text-neutral-400">Email</p>
                        <p>{user.email}</p>
                    </div>
                </div>
            </TabsContent>
            <TabsContent value="appointments">
                <p>This place seems empty!</p>
                <Link href="/doctor-list"><Button className="mt-3 hover:bg-[#2F374B]">Take an appointment</Button></Link>
            </TabsContent>
            <TabsContent value="notes">
                <p>All Notes goes here</p>
            </TabsContent>
            <TabsContent value="medications">
                <p>All medications goes here</p>
            </TabsContent>
            <TabsContent value="logs">
                <p>All logs goes here</p>
            </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default UserAccount;
