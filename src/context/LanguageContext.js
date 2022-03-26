import React, { createContext } from "react";
import useTranslation from "../hooks/useTranslation";

export const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
    const { t, language, updateLanguage } = useTranslation();

    return (
        <LanguageContext.Provider value={{ language, updateLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
};