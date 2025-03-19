import { createContext, useContext } from "react";

export interface SignContextType {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultValue: SignContextType = {
  openDialog: false,
  setOpenDialog: () => {}, // No-op function
};

export const SignContext = createContext<SignContextType>(defaultValue);

export const useSignContext = () => {
  const context = useContext(SignContext);
  if (!context) {
    throw new Error("Hero must be used within a UserDetailContext.Provider");
  }

  return context;
};
