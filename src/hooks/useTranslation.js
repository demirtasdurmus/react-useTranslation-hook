import { useState, useEffect, useRef, useCallback } from 'react';
import getLanguageFile from '../utils/getLanguageFile';
import setInitialLanguage from '../utils/setInitialLanguage';


export default function useTranslation(setLang) {
    // declare initial states
    const [{ language, strings }, setLanguage] = useState({
        language: setInitialLanguage(),
        strings: {}
    });
    const isJsonFetched = useRef(false);

    // update language and call json fetcher function
    const updateLanguage = useCallback(
        async (newLanguage) => {
            if (isJsonFetched.current && newLanguage === language) return;
            const fetchedStrings = await getLanguageFile({ language: newLanguage });
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
