import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'

const Admin = () => {
    redirect("/admin/dashboard")
}

export default Admin
