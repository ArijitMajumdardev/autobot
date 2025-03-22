import { Loader2Icon } from 'lucide-react'
import React from 'react'

const loading = () => {
  return (
    <div className='flex justify-center items-center'>
       <Loader2Icon className="animate-spin h-10 w-10 text-white" />
    </div>
  )
}

export default loading