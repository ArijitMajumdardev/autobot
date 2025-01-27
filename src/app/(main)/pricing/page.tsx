'use client'
import PricingModel from '@/components/custom/PricingModel';
import { useUserDetail } from '@/context/UserDetailContext';
import Colors from '@/data/Colors';
import Lookup from '@/data/Lookup'
import React from 'react'

const page = () => {
    const { userDetail, setUserDetail } = useUserDetail();

  return (
      <div className=' m-auto mt-2 h-[100vh] flex flex-col items-center '>
          <h2 className='font-bold text-3xl'>Pricing</h2>
          <p className='text-gray-400  max-w-xl text-center mt-4'>{Lookup.PRICING_DESC}</p>

          <div className='border p-5 rounded-xl w-[70vw] flex justify-between mt-7 items-center' style={{backgroundColor:Colors.BACKGROUND}}>
              <h2 className='text-lg '>
                  <span className='font-bold p-1'>{userDetail?.token}</span>
                  Tokens Left</h2>
              <div>
                  <h2>Need More Token?</h2>
                  <p>Upgrade your plan below</p>
          </div>
          </div>

          <PricingModel/>
          
    </div>
  )
}

export default page