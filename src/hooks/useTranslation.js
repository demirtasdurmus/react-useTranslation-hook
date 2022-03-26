import { useState, useEffect, useRef, useCallback } from 'react';

// fetch relevant json file
const getLanguageStrings = async ({ language }) => {
    const module = await import(`../languages/${language}/strings.json`);
    return module.default
};

// might be also configured according to client ip
const setInitialLang = () => {
    // declare allowed languages to prevent manipulation from local storage
    var allowedLangs = ["tr", "en"];

    // check localstorage for current lang
    const initialLang = localStorage.getItem("currentLang");

    if (!initialLang) {
        // if not first;
        // detect browser language
        let browserLanguage = window.navigator.language || window.navigator.userLanguage;
        // assign if there is a valid browser language
        if (browserLanguage && allowedLangs.indexOf(browserLanguage) > -1) {
            localStorage.setItem("currentLang", browserLanguage);
            return browserLanguage;
        };
        // or assign a default language(en)
        localStorage.setItem("currentLang", "en");
        return "en";
    } else {
        // set from localStorage if not malformed
        if (allowedLangs.indexOf(initialLang) > -1) {
            return initialLang;
        } else {
            // if localStorage option is malformed
            // set and return the defult language(en)
            localStorage.setItem("currentLang", "en");
            return "en";
        }
    };
};

export default function useTranslation(setLang) {
    // declare initial states
    const [{ language, strings }, setLanguage] = useState({
        language: setInitialLang(),
        strings: {}
    });
    const isJsonFetched = useRef(false);

    // update language and call json fetcher function
    const updateLanguage = useCallback(
        async (newLanguage) => {
            if (isJsonFetched.current && newLanguage === language) return;
            const fetchedStrings = await getLanguageStrings({ language: newLanguage });
            isJsonFetched.current = true;
            setLanguage({
                language: newLanguage,
                strings: fetchedStrings
            });
            localStorage.setItem("currentLang", newLanguage);
        }, [language]);

    // translate the actual strings
    const t = (translation) => {
        // split keys and assign to an array
        var keys = translation.split(".");
        var result = strings;

        // loop through to unnest the desired value
        for (let i = 0; i < keys.length; i++) {
            result = result[keys[i]]
            if (!result) break;
        };
        // console.log("translation", result);
        // return value or chained keys if malformed
        return result || translation
    };
    console.log("hook rerenders", language, strings)
    useEffect(() => {
        updateLanguage(language)
    }, [language, updateLanguage])

    return { t, language, updateLanguage }
};
