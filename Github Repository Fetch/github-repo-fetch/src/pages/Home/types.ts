export interface LanguageDataFromFetch {
    [language: string]: {
        color: string;
        url: string;
    };
}

export interface LanguageData {
    [language: string]: string;
}

export interface CachedItemData {
    item: string;
    expirationDate: Date;
}