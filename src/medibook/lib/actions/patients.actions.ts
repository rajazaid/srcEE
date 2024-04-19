"use server";
import { clerkClient } from "@clerk/nextjs";
import { connectToDatabase } from "../database/db.connection";
import { Patient } from "../database/models/patient.model";
import { CreatePatientProp, UpdatePatientProp } from "../types";
import { revalidatePath } from "next/cache";
import { error } from "console";

export async function createPatient(patientDetails: CreatePatientProp) {
  try {
    await connectToDatabase();
    console.log(patientDetails);
    const res = await Patient.create(patientDetails);
    if (res) {
      revalidatePath("/admin/users");
      revalidatePath("/doctor/users");
      return {
        success: true,
        data: JSON.parse(JSON.stringify(res)),
      };
    }
    throw new Error("Error creating patient");
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function deletePatient(id: string) {
  try {
    await connectToDatabase();
    const deletedPatient = await Patient.findOneAndDelete({ clerkId: id });
    if (deletedPatient) {
      revalidatePath("/admin/users");
      revalidatePath("/doctor/users");
      return {
        success: true,
      };
    }
    throw new Error("Error while deleting the patient");
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function getAllPatients({
    query,
  }: {
    query?: string;
    page?: number;
  }) {
    try {
      await connectToDatabase();
      const searchQuery = query
        ? { firstname: { $regex: query, $options: "i" } }
        : {};
      const patients = await Patient.find(searchQuery);
      if (patients) {
        return {
          success: true,
          data: JSON.parse(JSON.stringify(patients)),
        };
      }
  
      throw new Error("Error while fetching patients");
    } catch (error: any) {
      console.log(error);
      return {
        success: false,
        error: error.message,
      };
    }
}

export async function getPatientById(id: string) {
  try {
    await connectToDatabase();
    const patient = await Patient.findById({ _id: id });
    if (patient) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(patient)),
      };
    }
    throw new Error("Error while fetching data");
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function getAllPatientById({id, query}:{id:string, query:string}) {
  try {
    await connectToDatabase();
    const searchQuery = query
      ? { firstname: { $regex: query, $options: "i" } }
      : {};
    const condition = [searchQuery, {doctor:id}];
    const patients = await Patient.find({$and: condition});
    console.log(patients);
    
    if (patients) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(patients)),
      };
    }
    throw new Error("Error while fetching data");
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function findRole(id: string) {
    try {
      await connectToDatabase();
      const patient = await Patient.findById({ _id: id });
      if (patient?.role === "doctor") {
        return {
          success: true,
          data: JSON.parse(JSON.stringify(patient)),
        };
      } else if (patient?.role === "admin" || "patient") {
        return {
          success: false,
          error: "Assigned user is not a doctor",
        };
      }
      throw new Error("Error while validating role");
    } catch (error: any) {
      const err = error.message.split(" ");
      return {
        success: false,
        error: err[0] === "Cast" ? "Please enter a valid ID" : err.message,
      };
    }
}

export async function updatePatient({
    updateDetails,
    id,
  }: {
    updateDetails: UpdatePatientProp;
    id: string;
  }) {
    try {
      await connectToDatabase();
      console.log("Gender2 = " + updateDetails.gender!);
      for (var k in updateDetails){
        if (updateDetails.hasOwnProperty(k)) {
             console.log("Key is " + k + ", value is " + updateDetails["gender"]);
        }
      }
      const newUpdateDetails = {
        email: updateDetails["email"],
        clerkId: updateDetails["clerkId"],
        firstname: updateDetails["firstname"],
        lastname: updateDetails["lastname"],
        dob: updateDetails["dob"],
        age: updateDetails["age"],
        phoneNumber: updateDetails["phoneNumber"],
        gender: updateDetails["gender"],
        maritalStatus: updateDetails["maritalStatus"],
        contact: updateDetails["contact"],
        communication: updateDetails["communication"],
        medicalConditions: updateDetails["medicalConditions"],
        medications: updateDetails["medications"],
        immunizations: updateDetails["immunizations"],
        surgeries: updateDetails["surgeries"],
        hospitalizations: updateDetails["hospitalizations"],
        familyMedicalHistory: updateDetails["familyMedicalHistory"],
        bloodType: updateDetails["bloodType"],
        allergies: updateDetails["allergies"],
        role: updateDetails["role"],
        doctor: updateDetails["doctor"],
        address: updateDetails["address"],
      };
      const updatedPatient = await Patient.findOneAndUpdate(
        { clerkId: id },
        newUpdateDetails,
        { new: true }
      );
      console.log("update patient" + updatedPatient);
      if (updatedPatient) {
        return {
          success: true,
          data: JSON.parse(JSON.stringify(updatePatient)),
        };
      }
      throw new Error("Error while updating the patient");
    } catch (error: any) {
      console.log(error);
      return {
        success: false,
        error: error.message,
      };
    }
}

export async function updateClerk({
    clerkId,
    userDetails,
  }: {
    clerkId?: string;
    userDetails: UpdatePatientProp;
  }) {
    try {
      await connectToDatabase();
  
      const clerkUserObject = {
        firstName: userDetails?.firstname,
        lastName: userDetails?.lastname,
        publicMetadata: {
          userId: userDetails._id,
          role: userDetails?.role,
        },
      };
      
      const user = await clerkClient.users.updateUser(clerkId!, clerkUserObject);
      if (user) {
        const updatedUser = await updatePatient({
          updateDetails: userDetails,
          id: clerkId!,
        });
        console.log("From the server action updatePatient", updatedUser);
  
        if (updatedUser.success) {
          revalidatePath("/admin/users");
          revalidatePath("/doctor/users");
          return {
            success: true,
            data: updatedUser,
          };
        }
        return {
          success: false,
          error: updatedUser?.error,
        };
      }
    } catch (error: any) {
      if (error.clerkError) {
        return {
          success: false,
          error: error?.errors[0]?.message,
        };
      }
    }
}

export async function deleteClerkUser(id: string) {
    try {
      console.log(id);
      const res = await clerkClient.users.deleteUser(id);
      if (res) {
        return {
          success: true,
        };
      } else {
        return {
          success: false,
        };
      }
    } catch (error: any) {
      console.log(error.message);
    }
}