import { createContext, ReactNode, useEffect, useState } from "react";

type AppContextType = {
    isMobile: boolean,
    setIsMobile: React.Dispatch<React.SetStateAction<boolean>>
};

const AppContext = createContext<AppContextType>({
    isMobile: false,
    setIsMobile: () => { }
});

type AppContextProviderProps = {
    children: ReactNode;
};

const AppContextProvider = ({ children }: AppContextProviderProps) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize(); // Check on mount
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return <AppContext.Provider value={{
        isMobile,
        setIsMobile
    }}>{children}</AppContext.Provider>;
};

export { AppContext, AppContextProvider };