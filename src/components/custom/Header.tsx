"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { useUserDetail } from "@/context/UserDetailContext";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import uuid4 from "uuid4";

function Header() {
  
  const { userDetail, setUserDetail } = useUserDetail();


  // useEffect(() => {
  //   const handleUserCreation = async () => {
  //     if (session?.user) {
  //       try {
  //         // await createUser({
  //         //   name: session.user.name as string,
  //         //   email: session.user.email as string,
  //         //   image: session.user.image as string,
  //         //   uid: uuid4(),
  //         // });

  //         setUserDetail({
  //           name: session.user.name,
  //           email: session.user.email,
  //           image: session.user.image,
  //         });
  //       } catch (error) {
  //         console.error("Error creating user:", error);
  //       }
  //     }
  //   };

  //   handleUserCreation();
  // }, [session, createUser, setUserDetail]);

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
            <Image
              src={userDetail.image as string}
              alt={userDetail.name}
              width={36}
              height={36}
              className="rounded-full"
            />
            <Button
              className="bg-accent text-accent-foreground hover:bg-[#464646]"
              variant={"ghost"}
              
            >
              Log out
            </Button>
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
