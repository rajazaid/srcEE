import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"


const Loading = () => {
  return (
    <div>
      <Skeleton className='w-[100px] h-12 bg-[#2F374B]' />
      <div className='mt-6 flex justify-between items-center'>
        <Skeleton className='w-32 h-8 bg-[#2F374B]' />
        <Skeleton className='w-24 h-8 bg-[#2F374B]' />
      </div>
      <div className='mt-12 flex flex-col gap-4'>
        <Skeleton className='w-full h-8 bg-[#2F374B]' />
        <Skeleton className='w-full h-8 bg-[#2F374B]' />
        <Skeleton className='w-full h-8 bg-[#2F374B]' />
        <Skeleton className='w-full h-8 bg-[#2F374B]' />
        <Skeleton className='w-full h-8 bg-[#2F374B]' />
        <Skeleton className='w-full h-8 bg-[#2F374B]' />
      </div>
      <div className='mt-4 flex justify-end items-center gap-4'>
        <Skeleton className='bg-[#2F374B] w-28 h-12' />
        <Skeleton className='bg-[#2F374B] w-28 h-12' />
      </div>
    </div>
  )
}

export default Loading
