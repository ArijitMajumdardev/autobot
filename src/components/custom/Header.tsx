"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { useUserDetail } from "@/context/UserDetailContext";
import { useConvex, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import uuid4 from "uuid4";

import { usePathname } from "next/navigation";
import { useActionContext } from "@/context/ActionContext";
import { LucideDownload, PanelLeftOpenIcon, RocketIcon } from "lucide-react";
import { useSidebar } from "../ui/sidebar";
import { useSignContext } from "@/context/SignContext";

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";

function Header({ className }: { className: string }) {
  const { toggleSidebar } = useSidebar();
  const { openDialog, setOpenDialog } = useSignContext();
  const { action, setAction } = useActionContext();
  const { userDetail, setUserDetail,setNotLoaded } = useUserDetail();
  const { isSignedIn, user, isLoaded } = useUser();
    const convex = useConvex();
  const pathname = usePathname();
  console.log("pathanme", pathname);
  const isWorkspacePage = /^\/workspace\/[a-zA-Z0-9_-]+$/.test(pathname);
  console.log("isWorkspacePage ", isWorkspacePage);

  const OnActionBtn = (action: string) => {
    console.log("clicked export", action);
    setAction({
      actionType: action,
      timeStamp: Date.now(),
    });
  };

  //setting the context for the userDetail
  const settingUserDetailContext = async () => {
    if (user) {
      const email = user?.emailAddresses[0].emailAddress
      const result = await convex.query(api.users.GetUser, {
        email: email,
      });
  
      setUserDetail({
        name: result.name,
        email: result.email,
        image: result.image,
        _id: result._id,
        token: result.token,
      });
    }
    setNotLoaded(false)
  }
  useEffect(() => {
    settingUserDetailContext()
  },[user])

  return (
    <div className={`p-4 flex justify-between items-center ${className}`}>
      <div className="flex justify-between gap-4 items-center">
        {/* <Image
          src={"/chat-bubble_11401129.svg"}
          width={40}
          height={40}
          alt="logo"
        ></Image> */}
        <SignedIn>
          <PanelLeftOpenIcon onClick={toggleSidebar} />
          </SignedIn>
        <h1 className="text-2xl text-gray-400 font-bold">AutoBot</h1>
      </div>

      <div className="flex gap-5">
        <SignedIn>
          {isWorkspacePage && (
            <>
              <Button
                className="bg-gradient-to-tr from-purple-600 to-orange-500 hover:from-purple-500 hover:to-orange-400 transition-all duration-300"
                variant={"ghost"}
                onClick={() => OnActionBtn("export")}
              >
                <LucideDownload />
                Export
              </Button>

              <Button
                className="bg-gradient-to-tr from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-400 transition-all duration-300 "
                variant={"ghost"}
                onClick={() => OnActionBtn("deploy")}
              >
                <RocketIcon />
                Deploy
              </Button>
            </>
          )}

          <UserButton />
          {/* <Image
              onClick={toggleSidebar}
              src={userDetail.image as string}
              alt={userDetail.name}
              width={36}
              height={36}
              className="rounded-full cursor-pointer"
            /> */}
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <Button className="hover:bg-rose-600" variant={"ghost"}>
              Sign In
            </Button>
          </SignInButton>
          <SignUpButton>
            <Button>Sign Up</Button>
          </SignUpButton>
        </SignedOut>
      </div>
    </div>
  );
}

export default Header;
