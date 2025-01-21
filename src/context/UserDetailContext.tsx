

import { createContext, SetStateAction } from "react";

export interface IuserDetail {
    name: string;
    email: string;
    image: string;
}

export interface IUserDetailContext{
    userDetail: IuserDetail | undefined;
    setUserDetail: React.Dispatch<React.SetStateAction<IuserDetail | undefined>>;
}

export const UserDetailContext = createContext<IUserDetailContext | null>(null);