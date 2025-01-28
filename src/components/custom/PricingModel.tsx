import Lookup from '@/data/Lookup'
import React from 'react'
import { Button } from '../ui/button'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { useUserDetail } from '@/context/UserDetailContext'
import { useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { Id } from '../../../convex/_generated/dataModel'

const PricingModel = () => {
    const { userDetail, setUserDetail } = useUserDetail();
    const UpdateTokens = useMutation(api.users.UpdateToken)
    
    const onPaymentSuccess = async (value:number) => {
        const token = Number(userDetail?.token) + Number(value)
        console.log(token)
        await UpdateTokens({
            token: token,
            userId:userDetail?._id as Id<"users">
        })

        setUserDetail((prev) => {
            if (!prev) return undefined; 
            return {
              ...prev,
              token: token 
            };
          });
          

    }
    
  return (
      <div className='mt-10 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-[80vw]'>
          {
              Lookup.PRICING_OPTIONS.map((pricing,index) => (
                  <div key={index} className='border p-7 rounded-xl flex flex-col gap-3 '>
                      <h2 className='font-bold text-2xl'>
                          {pricing.name}
                      </h2>
                      <h2 className='font-medium text-lg '>{pricing.tokens}</h2>
                      <p className='text-gray-400 '>{pricing.desc}</p>
                      <h2 className='font-bold text-4xl text-center mt-6'>${pricing.price}</h2>
                      {/* <Button >
                          Upgrate to {pricing.name}
                      </Button> */}
                      <PayPalButtons style={{ layout: "horizontal" }}
                          disabled={!userDetail}
                          onCancel={()=>console.log("payment cancelled")}
                          onApprove={()=>onPaymentSuccess(pricing.value )}
                          createOrder={(data, actions) => {
                              return actions.order.create({
                                intent: "CAPTURE",
                                  purchase_units: [
                                      {
                                          amount:{
                                              value: pricing.price.toString() ,
                                              currency_code:'USD'
                                      }
                                  }
                              ]
                          })
                      }}
                      />
                  </div>
              ))
          }
      </div>

  )
}

export default PricingModel