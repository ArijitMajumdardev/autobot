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
  
  
  
  
  
  
  const { setUserDetail } = useUserDetail();

  const CreateUser = useMutation(api.users.CreateUser);
  const convex = useConvex();










  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const userInfo: any = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: "Bearer " + tokenResponse.access_token } }
      );

      console.log(userInfo);
      const user = userInfo.data;
      
      const UserIndb = await convex.query(api.users.GetUser, {
        email: user.email,
      });


      if (UserIndb.name ) {
        if (typeof window !== undefined) {
          localStorage.setItem("user", JSON.stringify(user));
        }

        const _id = UserIndb._id;
        setUserDetail({
          name: user.name,
          email: user.email,
          image: user.picture,
          _id: _id,
          token: 50000,
        });
        closeDialog(false);

        return
      }


      const result = await CreateUser({
        name: user.name,
        email: user.email,
        image: user.picture,
        uid: uuid4(),
      });

      console.log("this is the result ", result);

      if (result) {
        // Only set user details if the result is not null
        if (typeof window !== undefined) {
          localStorage.setItem("user", JSON.stringify(user));
        }

        const _id = result;
        setUserDetail({
          name: user.name,
          email: user.email,
          image: user.picture,
          _id: _id,
          token: 50000,
        });
        closeDialog(false);
      } else {
        console.error("Error: User creation failed or returned null.");
        // Optionally show a user-friendly error message
      }
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

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
              onClick={() => googleLogin()}
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
