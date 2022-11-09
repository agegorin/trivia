import React from "react";
import TriviaStore from "./store";

type StoreContextValue = {
  triviaStore: TriviaStore
}

const StoreContext = React.createContext<StoreContextValue>({} as StoreContextValue);

const triviaStore = new TriviaStore();

export const StoreProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return <StoreContext.Provider value={{triviaStore}}>
    {children}
  </StoreContext.Provider>
}

export const useStore = () => React.useContext(StoreContext);
