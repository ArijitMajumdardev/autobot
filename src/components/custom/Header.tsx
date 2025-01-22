'use client'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import { useSession } from 'next-auth/react'
import { useUserDetail } from '@/context/UserDetailContext'

function Header() {

  const {data : session} = useSession()
    const { userDetail, setUserDetail } = useUserDetail()
  
 
     useEffect(() => {
         
        
         if (session?.user) {
             setUserDetail({
                 name: session.user.name,
                 email: session.user.email,
                 image: session.user.image,
             });
         }
 
 
     }, [session, setUserDetail]);
 

  
  return (
      <div className='p-4 flex justify-between items-center'>
          <div className='bg-white w-11 h-11 flex justify-center items-center rounded-md'>
          <Image src={"/chat-bubble_11401129.svg"} width={40} height={40} alt='logo' ></Image>
          </div>

          <div className='flex gap-5'>
              <Button className='hover:bg-rose-600' variant={'ghost'} >Sign in</Button>
              <Button>Sign up</Button>
          </div>
    </div>
  )
}

export default Header