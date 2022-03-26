import React, { useContext } from 'react';
import { LanguageContext } from "../context/LanguageContext";
import Navbar from '../components/Navbar';


export default function Home() {
    const { t } = useContext(LanguageContext);

    return (
        <div className="App">
            <Navbar />
            <div className="App-header">
                <h1>{t("home.title.main")}</h1>
                <h3>{t("home.title.sub1")}</h3>
                <h3>{t("home.title.sub2")}</h3>
            </div>
        </div>
    )
};
