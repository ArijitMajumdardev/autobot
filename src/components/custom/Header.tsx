"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { useUserDetail } from "@/context/UserDetailContext";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import uuid4 from "uuid4";

import { usePathname } from "next/navigation";
import { useActionContext } from "@/context/ActionContext";
import { LucideDownload, RocketIcon } from "lucide-react";


function Header() {
  
  const { userDetail, setUserDetail } = useUserDetail();
  const pathname = usePathname()
  console.log("pathanme", pathname)
  const isWorkspacePage = /^\/workspace\/[a-zA-Z0-9_-]+$/.test(pathname);
  console.log("isWorkspacePage ", isWorkspacePage)
  const {action,setAction } = useActionContext()

  const OnActionBtn = (action: string) => {
    console.log(action)
    setAction({
      actionType: action,
      timeStamp:Date.now()
    })
  }

  return (
    <div className="p-4 flex justify-between items-center ">
      <div className="bg-white w-11 h-11 flex justify-center items-center rounded-md">
        <Image
          src={"/chat-bubble_11401129.svg"}
          width={40}
          height={40}
          alt="logo"
        ></Image>
      </div>

      <div className="flex gap-5">
        {userDetail?.name ? (
          <>
            {
              isWorkspacePage && (
                <>
                <Button  className="bg-gradient-to-tr from-purple-600 to-orange-500 hover:from-purple-500 hover:to-orange-400 transition-all duration-300"
                    variant={"ghost"}
                  onClick={()=>OnActionBtn('export')}
                  ><LucideDownload/>Export</Button>
                  
                   
                <Button  className="bg-gradient-to-tr from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-400 transition-all duration-300 "
                    variant={"ghost"}
                    onClick={()=>OnActionBtn('deploy')}
                  ><RocketIcon />Deploy</Button>
                </>
              )
            }
            
            <Image
              src={userDetail.image as string}
              alt={userDetail.name}
              width={36}
              height={36}
              className="rounded-full"
            />
           
          </>
        ) : (
          <>
            <Button
              className="hover:bg-rose-600"
              variant={"ghost"}
              
            >
              Sign in
            </Button>
            <Button>Sign up</Button>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
