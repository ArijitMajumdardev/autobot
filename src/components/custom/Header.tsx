'use client'
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'

function Header() {
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