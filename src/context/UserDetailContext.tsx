'use client'

import { createContext, SetStateAction, useContext } from "react";

export interface IuserDetail {
    name: string | null | undefined;
    email: string | null | undefined;
    image: string | null | undefined;
    _id: string,
    token: number|undefined
}

export interface IUserDetailContext{
    userDetail: IuserDetail | undefined;
    setUserDetail: React.Dispatch<React.SetStateAction<IuserDetail | undefined>>;
}

export const UserDetailContext = createContext<IUserDetailContext | null>(null);


export const useUserDetail = () => {
    const context = useContext(UserDetailContext);
      if (!context) {
        throw new Error('Hero must be used within a UserDetailContext.Provider');
    }
    
    return context
}