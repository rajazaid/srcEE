// CreatePatientProp should contain all the fields that might be required for creating a new patient record
export type CreatePatientProp = {
    email: string;
    clerkId?: string;
    firstname: string;
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
        date?: string;  // Using string type for consistency in creation prop
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
    doctor?: string;
    address?: string;
}

// UpdatePatientProp should make almost all fields optional since updates might not include all fields
export type UpdatePatientProp = {
    _id?: string;
    email?: string;
    clerkId?: string;
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
