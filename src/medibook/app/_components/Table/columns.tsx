"use client";

import { ColumnDef } from "@tanstack/react-table";
import { AiOutlineEdit } from "react-icons/ai";
import UserForm from "./UserForm";
import Delete from "../Delete";

export type User = {
  userid: string;
  email: string; 
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
};

export const columns: ColumnDef<User>[] = [
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <UserForm access="admin" user={row.original} type="Edit">
          <AiOutlineEdit size="18px" className="text-green-600" style={{ cursor: 'pointer' }} />
        </UserForm>
        <Delete data={row.original} />
      </div>
    ),
    header: () => <span>Actions</span>,
  },
  {
    accessorKey: "_id",
    header: "User ID",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "firstname",
    header: "First Name",
  },
  {
    accessorKey: "lastname",
    header: "Last Name",
  },
  {
    accessorKey: "dob",
    header: "DOB",
    cell:({row})=>{
      const date = new Date(row.getValue('dob'));
      const formatedDate = date.toLocaleString("en-US", {year:"numeric",month:"short", day:"numeric"})
      return formatedDate !== 'Invalid Date' ? <div className="w-24">{formatedDate}</div> : "N/A"
    }
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "maritalStatus",
    header: "Marital Status",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "doctor",
    header: "Doctor Assigned",
    cell: ({ row }) => row.getValue('doctor') || 'N/A'
  },
  {
    accessorKey: "medicalConditions",
    header: "Medical Conditions",
    cell: ({ row }) => {
        const medicalConditions = row.getValue('medicalConditions');
        // Check if medicalConditions is truly an array
        if (Array.isArray(medicalConditions)) {
            return medicalConditions.join(', ');
        } else {
            return 'N/A';
        }
    }
  },
  {
    accessorKey: "allergies",
    header: "Allergies",
    cell: ({ row }) => {
      const allergies = row.getValue('allergies');
      return allergies ? Object.entries(allergies).map(([key, value]) => `${key}: ${value.join(', ')}`).join('; ') : 'N/A';
    }
  },
];
