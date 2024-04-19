import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

const Patients = () => {
  const {sessionClaims} = auth();
  const id = sessionClaims?.userId as string;
  redirect(`/patients/${id}`);
}

export default Patients
