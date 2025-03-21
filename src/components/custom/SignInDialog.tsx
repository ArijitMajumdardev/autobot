import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Lookup from "@/data/Lookup";
import { Button } from "../ui/button";
import { IuserDetail, useUserDetail } from "@/context/UserDetailContext";
import { useConvex, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import uuid4 from "uuid4";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Id } from "../../../convex/_generated/dataModel";
import { SignInButton } from "@clerk/nextjs";

export interface Iresult {
  name: string | null | undefined;
  email: string | null | undefined;
  picture: string | null | undefined;
  _id: string;
  uid: string;
}

function SignInDialog({
  openDialog,
  closeDialog,
  userInput,
}: {
  openDialog: boolean;
  closeDialog: (v: boolean) => void;
  userInput: string;
}) {

  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription className="flex flex-col justify-centerf items-center ">
            <span className="font-bold text-xl text-white">
              {Lookup.SIGNIN_HEADING}
            </span>
            <span className="mt-2">{Lookup.SIGNIN_SUBHEADING}</span>
            <SignInButton>
            <Button
              className="mt-2 bg-gradient-to-tr from-purple-600 to-orange-500 text-white hover:from-purple-500 hover:to-orange-400 transition-all duration-300"
            >
              Sign in with Google
              </Button>
              </SignInButton>
          </DialogDescription>

          <div>
            <h2></h2>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default SignInDialog;
