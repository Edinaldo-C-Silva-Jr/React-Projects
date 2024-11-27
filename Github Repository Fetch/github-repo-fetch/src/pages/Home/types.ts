export interface LanguageDataFromFetch {
    [language: string]: {
        color: string;
        url: string;
    };
}

export interface FormattedLanguageData {
    [language: string]: string;
}
