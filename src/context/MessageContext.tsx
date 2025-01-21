
import { createContext } from "react";

export interface IMessage {
  role: string;
  content: string;
}


export interface MessageContextType {
  message: IMessage | undefined ;
  setMessage: React.Dispatch<React.SetStateAction<IMessage | undefined>>;
}

export const MessageContext = createContext<MessageContextType|null>(null)