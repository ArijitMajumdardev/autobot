import { HelpCircle, LogOut, LucideProps, Settings, Wallet } from "lucide-react"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { ForwardRefExoticComponent, RefAttributes } from "react"
import { useSidebar } from "../ui/sidebar"
import { useUserDetail } from "@/context/UserDetailContext"


export default function SideFooter() {
    const { toggleSidebar } = useSidebar()
    const {setUserDetail} = useUserDetail()
    const router = useRouter()
    const options=[
        {
            name:'Settings',
            icon:Settings
        },
        {
            name:'Help Center',
            icon:HelpCircle
        },
        {
            name:'My Subscription',
            icon: Wallet,
            path:'/pricing'
        },
        {
            name:'Sign Out',
            icon:LogOut
        },
    ]

    const onOptionClick = (item: { name: string, icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>, path?: string }) => {
        
        if (item.name == 'Sign Out') {
            localStorage.removeItem('user')
            setUserDetail(undefined)
            return
        }
        router.push(item.path as string)
        toggleSidebar()
    }
    return(
        <div className="p-5 mb-10">
      {options.map((option,index)=>(
        <Button variant="ghost" className="w-full flex justify-start my-3" key={index} onClick={()=>onOptionClick(option)}>
   <option.icon/>
   {option.name}
        </Button>
      ))}
      </div>
    )
}