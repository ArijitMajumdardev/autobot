import { createContext, useContext } from "react";

export interface Iaction {
  actionType: string;
  timeStamp: number;
}

export interface ActionContextType {
  action: Iaction | undefined;
  setAction: React.Dispatch<React.SetStateAction<Iaction | undefined>>;
}

const defaultValue: ActionContextType = {
  action: undefined,
  setAction: () => {}, // No-op function
};

export const ActionContext = createContext<ActionContextType>(defaultValue);

export const useActionContext = () => {
  const context = useContext(ActionContext);
  if (!context) {
    throw new Error("Hero must be used within a UserDetailContext.Provider");
  }

  return context;
};
