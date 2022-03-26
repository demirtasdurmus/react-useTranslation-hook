// fetch relevant json file
export default async function getLanguageFile({ language }) {
    const module = await import(`../languages/${language}/strings.json`);
    return module.default
};