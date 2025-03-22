"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import {
  IMessage,
  MessageContext,
  MessageContextType,
} from "@/context/MessageContext";
import {
  IuserDetail,
  IUserDetailContext,
  UserDetailContext,
} from "@/context/UserDetailContext";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useConvex, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { SidebarProvider } from "./ui/sidebar";
import AppSideBar from "./custom/AppSideBar";
import Header from "./custom/Header";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { ActionContext, Iaction } from "@/context/ActionContext";
import { useRouter } from "next/navigation";
import { SignContext } from "@/context/SignContext";

export default function Provider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [message, setMessage] = useState<IMessage[]>([]);
  const [userDetail, setUserDetail] = useState<IuserDetail | undefined>(
    undefined
  );
  const [action, setAction] = useState<Iaction>();
  const [openDialog, setOpenDialog] = useState(false);
  const [notLoaded,setNotLoaded] = useState(true)
  const router = useRouter();
  const convex = useConvex();

  // const isAuthenticated = async () => {
  //   if (typeof window !== undefined) {
  //     const user = JSON.parse(localStorage.getItem("user") as string);
  //     if (!user) {
  //       router.push("/");
  //       return;
  //     }
  //     if (user) {
  //       const result = await convex.query(api.users.GetUser, {
  //         email: user.email,
  //       });

  //       setUserDetail({
  //         name: result.name,
  //         email: result.email,
  //         image: result.image,
  //         _id: result._id,
  //         token: result.token,
  //       });
  //       console.log(result);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   isAuthenticated();
  // }, []);

  return (
    <>
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
    >
      {/* <PayPalScriptProvider
        options={{
          clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
        }}
      > */}
        <UserDetailContext.Provider value={{ userDetail, setUserDetail ,notLoaded,setNotLoaded}}>
          <MessageContext.Provider value={{ message, setMessage }}>
            <ActionContext.Provider value={{ action, setAction }}>
              <SignContext.Provider value={{ openDialog, setOpenDialog }}>
                <NextThemesProvider {...props}>
                  <SidebarProvider defaultOpen={false}>
                    <div className="h-screen">
                      {/* Header */}

                      {/* Sidebar and Content */}
                      <div className="flex flex-1 min-h-[88vh] relative">
                        <AppSideBar className="" />
                        {/* Adjust padding-top to match Header's height */}
                        <main className=" overflow-y-auto w-[98vw] absolute  ">
                      <Header className="sticky w-full" />
                          {children}
                        </main>
                      </div>
                    </div>
                  </SidebarProvider>
                </NextThemesProvider>
              </SignContext.Provider>
            </ActionContext.Provider>
          </MessageContext.Provider>
        </UserDetailContext.Provider>
      {/* </PayPalScriptProvider> */}
      </GoogleOAuthProvider>
      </>
  );
}
