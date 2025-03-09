import { createContext, ReactNode } from "react";

type AppContextType = {};

const AppContext = createContext<AppContextType>({});

type AppContextProviderProps = {
    children: ReactNode;
};

const AppContextProvider = ({ children }: AppContextProviderProps) => {
    
    return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

export { AppContext, AppContextProvider };