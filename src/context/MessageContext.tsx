"use client";
import { createContext, useContext } from "react";

export interface IMessage {
  role: string;
  content: string;
}

export interface MessageContextType {
  message: IMessage[];
  setMessage: React.Dispatch<React.SetStateAction<IMessage[]>>;
}

export const MessageContext = createContext<MessageContextType>({
  message: [], // Initialize with an empty array
  setMessage: () => {},
});
export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("Hero must be used within a MessageContext.Provider");
  }

  return context;
};
