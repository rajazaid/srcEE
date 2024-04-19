import { toast } from "@/components/ui/use-toast";
import { deleteClerkUser } from "@/lib/actions/patients.actions";
import { UpdatePatientProp } from "@/lib/types";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
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

const Delete = ({ data }: { data: UpdatePatientProp }) => {
  const deleteUser = async (id: string) => {
    let res = await deleteClerkUser(id);
    if (res&&res?.success) toast({ title: "User Deleted"});
    else toast({ title: "Error while deleting user"});
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <AiOutlineDelete
          size="18px"
          className="text-red-400"
          cursor="pointer"
        />
      </AlertDialogTrigger>
      <AlertDialogContent className="border-none outline-none">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteUser(data.clerkId!)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Delete;
