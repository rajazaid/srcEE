import React from 'react'
import { UserTable } from '@/app/_components/Table/UserTable'
import { columns } from "../../../_components/Table/columns"
import { getAllPatients } from '@/lib/actions/patients.actions';
import { auth } from '@clerk/nextjs';

const Users = async({searchParams}:{searchParams:{query:string}}) => {
  const {query=""} = searchParams;
  const users = await getAllPatients({query});
  const {sessionClaims} = auth();
  const id = sessionClaims?.userId;
  
  return (
    <div className=''>
      <h1 className='text-2xl'>All Users</h1>
      <UserTable columns={columns} data={users.data}  />
    </div>
  )
}

export default Users
