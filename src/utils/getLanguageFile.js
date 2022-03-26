// fetch json file of selected language 
export default async function getLanguageFile({ language }) {
    const module = await import(`../languages/${language}/strings.json`);
    return module.default
};