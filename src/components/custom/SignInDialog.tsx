import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import Lookup from '@/data/Lookup'
import { Button } from '../ui/button'

function SignInDialog({openDialog,closeDialog}:{openDialog : boolean , closeDialog : (v: boolean) => void}) {
  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>

  <DialogContent>
    <DialogHeader>
      <DialogTitle></DialogTitle>
          <DialogDescription className='flex flex-col justify-centerf items-center '>
            <span className='font-bold text-xl text-white'>
            {Lookup.SIGNIN_HEADING}
            </span>
            <span className='mt-2'>{Lookup.SIGNIN_SUBHEADING}</span>
            <Button className="mt-2 bg-gradient-to-tr from-purple-600 to-orange-500 text-white hover:from-purple-500 hover:to-orange-400 transition-all duration-300">
  Sign in with Google
</Button>

          </DialogDescription>
                     
          <div  >
            <h2></h2>
            
            </div>  
    </DialogHeader>
  </DialogContent>
</Dialog>

  )
}

export default SignInDialog  