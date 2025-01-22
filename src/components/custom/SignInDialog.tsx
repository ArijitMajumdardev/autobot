import React from "react";
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
import { signIn } from "next-auth/react";

function SignInDialog({
  openDialog,
  closeDialog,
  userInput,
}: {
  openDialog: boolean;
  closeDialog: (v: boolean) => void;
  userInput: string;
  }) {
  
  
  const handleSignIn = () => {
    localStorage.setItem('unsentPrompt', userInput);
    signIn("google")
  }
  
  
  
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
            <Button
              className="mt-2 bg-gradient-to-tr from-purple-600 to-orange-500 text-white hover:from-purple-500 hover:to-orange-400 transition-all duration-300"
              onClick={handleSignIn}
            >
              Sign in with Google
            </Button>
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
