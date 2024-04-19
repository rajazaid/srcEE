import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { useState } from "react";
import { AiOutlineCalendar, AiOutlineLoading, AiOutlineUser } from "react-icons/ai";
import { UpdatePatientProp } from "@/lib/types";
import { findRole, updateClerk } from "@/lib/actions/patients.actions";
import { toast } from "@/components/ui/use-toast";
import { useForm, SubmitHandler } from "react-hook-form"
import Image from "next/image";
import LoadingGif from '../../../public/images/loading.gif'


interface IFormInput {
  firstname?: string;
    lastname?: string;
    dob?: Date;
    age?: number;
    phoneNumber?: string;
    gender?: 'male' | 'female' | 'other';
    maritalStatus?: 'Single' | 'Married' | 'Divorced' | 'Widowed';
    contact?: {
        name?: string;
        relationship?: string;
        phoneNumber?: string;
    };
    communication?: string;
    medicalConditions?: string[];
    medications?: {
        name?: string;
        dosage?: string;
        frequency?: string;
    }[];
    immunizations?: {
        vaccine?: string;
        date?: string;  // Using string type for consistency in update prop
    }[];
    surgeries?: {
        name?: string;
        date?: string;
    }[];
    hospitalizations?: {
        reason?: string;
        date?: string;
    }[];
    familyMedicalHistory?: {
        relation?: string;
        condition?: string;
    }[];
    bloodType?: string;
    allergies?: {
        medications?: string[];
        foods?: string[];
        others?: string[];
    };
    role?: 'admin' | 'doctor' | 'patient';
    doctor?: string | null;
    address?: string;
}

const UserForm = ({type, children, user, access}:{type:'Create'|'Edit', children:React.ReactNode, user: UpdatePatientProp, access?:string}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [date, setDate] = React.useState<Date | undefined>(type==='Edit'?user.dob:undefined)
    const [role, setRole] = React.useState<'admin' | 'doctor' | 'patient' | undefined>(type==='Edit'?user.role:undefined);
    const [gender, setGender] = React.useState<'male' | 'female' | 'other' | undefined>(type==='Edit'?user.gender:undefined);
    const { register, handleSubmit, reset } = useForm<IFormInput>({
      defaultValues: type === 'Edit' ? {
        ...user
      }: {}
    })
    const onSubmit: SubmitHandler<IFormInput> = async(data) => {
      
      const newData = {...data, dob:date, role, gender, doctor: data.doctor?.length===0?null:data.doctor};
      // console.log(newData)
      const {doctor} = data;
      setLoading(true);
      if(doctor&&doctor.length>0){
        if(newData.doctor===user?._id){
          toast({title: "You can't assign to the same person"})
          setLoading(false)
          return;
        }
        const response = await findRole(doctor);
        const isDoctor = response?.success;
        if(!isDoctor) {
          toast({title: response?.error? response?.error : "Assigned user is not a doctor"})
          setLoading(false);
          return;
        }
      }
      console.log(newData)
      const res = await updateClerk({clerkId:user.clerkId, userDetails: newData})

      if(res?.success){
        toast({title:"User updated successfully"})
      }else toast({title: res?.error? res.error : "User Updation Failed" })
      setLoading(false);
    }
    return (
      <Dialog >
        <DialogTrigger asChild>
          <p
          >
            {children}
          </p>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] w-[90%] border-none">
          <DialogHeader>
            <DialogTitle className="text-lg">{type==="Edit"?"Update a record":"Create a new record"}</DialogTitle>
            <DialogDescription className="pt-2">
              {type === 'Edit'? "You can update a record by filling the fields below." : "You can create a new record by filling the fields below."} Click save changes
              when you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-4">
              <Label htmlFor="name" className="w-1/3">
                First Name
              </Label>
              <Input
                id="firstname"
                {...register('firstname')}
                className="border-none bg-[#2F374B] focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-neutral-300"
              />
            </div><div className="flex items-center gap-4">
              <Label htmlFor="name" className="w-1/3">
                Last Name
              </Label>
              <Input
                id="lastname"
                {...register('lastname')}
                className="border-none bg-[#2F374B] focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-neutral-300"
              />
            </div>
            <div className="grid grid-cols-6 gap-4 md:gap-2">
              <div className="col-span-6 md:col-span-3">
              {access==='admin'&&<Select defaultValue={role} onValueChange={(e)=> {
                const givenrole = e.charAt(0).toLowerCase() + e.slice(1) as 'admin' | 'doctor' | 'patient';
                setRole(givenrole)
              }}
            
              >
                <SelectTrigger className="border-none col-span-3 ring-0 focus-visible:ring-0 focus:ring-0 focus-within:ring-0 outline-none bg-[#2F374B]">
                  <SelectValue  placeholder="Role" />
                </SelectTrigger>
                <SelectContent >
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="doctor">Doctor</SelectItem>
                  <SelectItem value="patient">Patient</SelectItem>
                </SelectContent>
              </Select>}
              </div>
              <div className="col-span-6 md:col-span-3">
              {access==='admin'&&<Select defaultValue={gender} onValueChange={(e)=> {
                const givengender = e.charAt(0).toLowerCase() + e.slice(1) as 'male' | 'female' | 'other';
                console.log(givengender)
                setGender(givengender)
              }}
            
              >
                <SelectTrigger className="border-none col-span-3 ring-0 focus-visible:ring-0 focus:ring-0 focus-within:ring-0 outline-none bg-[#2F374B]">
                  <SelectValue  placeholder="gender" />
                </SelectTrigger>
                <SelectContent >
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>}
              </div>
              {/* <Select>
              <SelectTrigger className="border-none col-span-3 ring-0 focus-visible:ring-0 focus:ring-0 focus-within:ring-0 outline-none bg-[#2F374B]">
                  <SelectValue  placeholder="Gender" />
                </SelectTrigger>
                <SelectContent >
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select> */}
              <div className="col-span-6 md:col-span-3">
              <Popover>
                <PopoverTrigger className="w-full" asChild>
                  <Button
                    className={cn(
                      "justify-start flex col-span-3 text-left font-normal border-none ring-0 focus-visible:ring-0 focus:ring-0 focus-within:ring-0 outline-none bg-[#2F374B] hover:bg-none",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <AiOutlineCalendar size="sm" className="w-6 pr-2" />
                    {date ? format(date, "PPP") : <span className="text-neutral-300 ">Date of Birth</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    captionLayout="dropdown-buttons"
                    selected={date}
                    onSelect={setDate}
                    fromYear={1950}
                    toYear={2030}
                  />
                </PopoverContent>
              </Popover>
              </div>
               
            </div>
            <div className="grid grid-cols-4 gap-2">
            <Input id="age"
                  placeholder="Age"
                  {...register('age')}
                  className="col-span-2 border-none bg-[#2F374B] focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-neutral-300" ></Input>
            </div>
            {access==='admin'&&<div className="flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <Label htmlFor="name" className="w-1/3">
                  Assign to
                </Label>
                <Input
                  id="doctor"
                  placeholder="Enter the ID of doctor"
                  {...register('doctor')}
                  className="border-none bg-[#2F374B] focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-neutral-300"
                />
              </div>
              <p className="text-xs text-neutral-300 italic">Make sure the entered ID is a valid doctor.</p>
              <div className="grid grid-cols-4 gap-2">
            <Input id="phoneNumber"
                  placeholder="Phone Number"
                  {...register('phoneNumber')}
                  className="col-span-2 border-none bg-[#2F374B] focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-neutral-300" ></Input>
            </div>
            <div className="grid grid-cols-4 gap-2">
            <Input id="address"
                  placeholder="Address"
                  {...register('address')}
                  className="col-span-2 border-none bg-[#2F374B] focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-neutral-300" ></Input>
            </div>
            </div>}
          </div>
          <DialogFooter>
            <Button disabled={loading} type="submit" className="hover:bg-[#2F374B] bg-secondary">
              {loading? <span className="flex items-center gap-2">Saving Change <Image src={LoadingGif} alt="gif" width={20} height={20} /></span>  : "Save changes"}
            </Button>
          </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  };

export default UserForm;
