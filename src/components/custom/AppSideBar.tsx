import React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    useSidebar,
  } from "@/components/ui/sidebar"
import Image from 'next/image'
import { Button } from '../ui/button'
import { MessageCircleCode } from 'lucide-react'
import { WorkspaceHistory } from './WorkspaceHistory'
import SideFooter from './SideFooter'
import Link from 'next/link'
import { useRouter } from 'next/navigation'


const AppSideBar = ({ className }: { className: string }) => {
  const router = useRouter()
  const { toggleSidebar } = useSidebar()
  return (
    <Sidebar className={`${className}`}>
      <SidebarHeader className='p-5' >
        
          <div className="bg-white w-11 h-11 flex justify-center items-center rounded-md">
                  <Image
                    src={"/chat-bubble_11401129.svg"}
                    width={40}
                    height={40}
                    alt="logo"
                    ></Image>
        </div>
        
    
        <Button className='mt-5 w-full' onClick={() => { router.push('/'); toggleSidebar()}}> <MessageCircleCode/> Start New Chat</Button>
                    </SidebarHeader>
          <SidebarContent className='p-5 scrollbar-hide'>
             
              <SidebarGroup />
              <WorkspaceHistory/>
      {/* <SidebarGroup /> */}
    </SidebarContent>
      <SidebarFooter >
     <SideFooter/>
      </ SidebarFooter>
  </Sidebar>
  )
}

export default AppSideBar