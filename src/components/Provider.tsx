'use client'
import React, { ReactNode, useState } from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { IMessage, MessageContext, MessageContextType } from '@/context/MessageContext'
import { IuserDetail, IUserDetailContext, UserDetailContext } from '@/context/UserDetailContext'
import { SessionProvider } from 'next-auth/react'



export default function Provider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    
    const [message, setMessage] = useState<IMessage|undefined>(undefined)
    const [userDetail,setUserDetail] = useState<IuserDetail| undefined>(undefined)
    return (
      
        <UserDetailContext.Provider value={{userDetail,setUserDetail}}>

        <MessageContext.Provider value={{message, setMessage}}>

      <NextThemesProvider {...props}>
           
          {children}
            
      </NextThemesProvider>
        </MessageContext.Provider>
            </UserDetailContext.Provider>
            

  )
}
