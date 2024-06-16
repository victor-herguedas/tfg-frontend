import { createContext, useContext, useState } from 'react';

interface PopUpContextType {
    isActivated: boolean;
    setIsActivated: (isActivated: boolean) => void;
}

interface PopUpProviderProps {
    isActivated: boolean;
    setIsActivated: (isActivated: boolean) => void;
    children: React.ReactNode;
}

export const PopUpContext = createContext<PopUpContextType | undefined>(undefined);

export const PopUpProvider = ({ isActivated, setIsActivated , children}: PopUpProviderProps) => {

    return (
        <PopUpContext.Provider value={{ isActivated, setIsActivated}}>
            {children}
        </PopUpContext.Provider>
    );
};
