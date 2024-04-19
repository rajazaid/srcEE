import { UserTable } from '@/app/_components/Table/UserTable'
import React from 'react'
import { columns } from '@/app/_components/Table/columns'
import { auth } from '@clerk/nextjs'
import { getAllPatientById } from '@/lib/actions/patients.actions'

const MyPatients = async ({searchParams}:{searchParams:{query:string}}) => {
  const {sessionClaims} = auth();
  const id = sessionClaims?.userId as string;
  const {query=""} = searchParams;
  const users = await getAllPatientById({id, query})
  return (
    <div>
      <h1 className='text-2xl'>My Patients</h1>
      <UserTable data={users.data} columns={columns} />
    </div>
  )
}

export default MyPatients
