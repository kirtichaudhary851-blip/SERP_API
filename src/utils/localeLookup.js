import countries from '../mock/mockCountries.json'
import languages from '../mock/mockLanguages.json'

export const countryName = (code) => countries.find((item) => item.code === code)?.name || code
export const languageName = (code) => languages.find((item) => item.code === code)?.name || code
