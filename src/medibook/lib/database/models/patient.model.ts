import mongoose, { Schema, model, models } from "mongoose";

const patientSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (value: string) {
        return /^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,7}$/.test(value);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  clerkId: String,  // Assuming you meant this as 'User ID'
  firstname: { type: String, required: true},
  lastname: { type: String},
  age: { type: Number },
  dob: {
    type: Date,
    validate: {
      validator: function (value: Date) {
        return value < new Date();
      },
      message: () => `Date of birth cannot be later than the current date!`,
    },
  },
  phoneNumber: { type: String },  // Added Phone Number
  gender: { type: String, default: "male", enum: ['male', 'female', 'other'] },  // Added Gender
  maritalStatus: { type: String, enum: ['Single', 'Married', 'Divorced', 'Widowed'] },  // Added Marital Status
  contact: {  // Added Contact
    name: String,
    relationship: String,
    phoneNumber: String,
  },
  communication: { type: String },  // Added Communication (could specify more about what this is)
  medicalConditions: [{ type: String }],  // Added Medical Conditions
  medications: [{  // Added Medications
    name: String,
    dosage: String,
    frequency: String,
  }],
  immunizations: [{  // Added Immunizations
    vaccine: String,
    date: Date,
  }],
  surgeries: [{  // Added Surgeries/Procedures
    name: String,
    date: Date,
  }],
  hospitalizations: [{  // Added Hospitalizations
    reason: String,
    date: Date,
  }],
  familyMedicalHistory: [{  // Added Family Medical History
    relation: String,
    condition: String,
  }],
  bloodType: { type: String },  // Added Blood Type
  allergies: {  // Added Medication, Food, and Other Allergies
    medications: [{ type: String }],
    foods: [{ type: String }],
    others: [{ type: String }],
  },
  role: {
    type: String,
    default: "patient",
    enum:["patient","admin","doctor"],
  },
  doctor: {
    type: mongoose.Types.ObjectId,
  },
  address: { type: String },
  createdat: { type: Date, default: Date.now },
});

export const Patient = models?.Patient || model("Patient", patientSchema, 'patients');
