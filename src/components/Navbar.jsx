import React, { useContext } from 'react';
import { LanguageContext } from "../context/LanguageContext";


export default function Navbar() {
    const { t, language, updateLanguage } = useContext(LanguageContext);

    return (
        <div
            style={{ width: '100%', height: '5rem', backgroundColor: 'grey', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>

            <div>{t("navbar.about")}</div>
            <div>{t("navbar.contact")}</div>

            <select value={language} onChange={(e) => updateLanguage(e.target.value)}>
                <option value="en">English</option>
                <option value="tr">Turkish</option>
            </select>
        </div>
    )
};