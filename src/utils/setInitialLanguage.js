// might be also configured according to client ip
export default function setInitialLanguage() {
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