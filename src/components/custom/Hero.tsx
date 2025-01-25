'use client'

import React, { useContext, useEffect, useState } from 'react'
import Lookup from '@/data/Lookup'
import Colors from '@/data/Colors'
import { ArrowRight } from 'lucide-react'
import { MessageContext, useMessage } from '@/context/MessageContext'
import { UserDetailContext, useUserDetail } from '@/context/UserDetailContext'
import SignInDialog from './SignInDialog'
import { useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { CreateWorkspace } from '../../../convex/workspace'
import { Id } from '../../../convex/_generated/dataModel'
import { useRouter } from 'next/navigation'


interface MessageContextType {
    message: { role: string, content: string } |undefined;
    setMessage: (value: { role: string; content: string }|undefined ) => void;
    
  }


function Hero() {
 
    const [userInput, setUserInput] = useState<string>('')
    const [openDialog,setOpenDialog] = useState(false)

    const { userDetail, setUserDetail } = useUserDetail()
    const { message, setMessage } = useMessage();
    const router = useRouter()

const CreateWorkspace = useMutation(api.workspace.CreateWorkspace)
    // useEffect(() => {
        
    //     const savedPrompt = localStorage.getItem('unsentPrompt');
    //     if (savedPrompt) {
    //       setUserInput(savedPrompt);
    //       localStorage.removeItem('unsentPrompt'); // Clean up after restoration
    //     }
       


    // }, []);


    const onGenerate = async(input: string) => {
        if (!userDetail?.name) {
            setOpenDialog(true)
            return
        }


        const msg = {
            role: 'user',
            content : input
        }
        setMessage(msg)

        const workspaceId = await CreateWorkspace({
            user: userDetail._id as Id<"users">,
            messages: [msg]
        })

        router.push('/workspace/'+workspaceId)

    }

    console.log("message",message)
    // console.log("session clent ",session)
  return (
      <div className=' flex flex-col gap-2 items-center mt-36'>
          <h2 className='font-bold text-3xl'>{Lookup.HERO_HEADING}</h2>
          <p className='text-gray-400 font-medium'>{Lookup.HERO_DESC}</p>
          
          <div className='p-5 w-full border max-w-xl rounded-xl mt-3 bg-zinc-800 group focus-within:bg-zinc-700 transition-colors duration-150 '>
              <div className='flex gap-2 '>
                  <textarea placeholder={Lookup.INPUT_PLACEHOLDER} className='w-full h-32 resize-none max-h-52 bg-transparent outline-none' onChange={(e) => setUserInput(e.target.value)} value={userInput}/>
                  {userInput && <ArrowRight onClick={()=>onGenerate(userInput)} className='h-10 w-10 p-2 hover:bg-rose-500 rounded-md cursor-pointer' />}
              </div>
          </div>

          <div className='flex max-w-xl flex-wrap items-center justify-center gap-3 mt-8 '>
              {Lookup.SUGGSTIONS.map((suggestion, index) => (
                  <h2 key={index} onClick={()=>onGenerate(userInput)} className='border rounded-full text-sm text-gray-400 p-1 px-2 hover:text-white cursor-pointer'>
                      {suggestion
                  }</h2>
              ))}
          </div>
          {openDialog && (
                <SignInDialog openDialog={openDialog} closeDialog={(v: boolean) => setOpenDialog(v)} userInput={userInput} />
            )}
    </div>
  )
}



export default Hero
