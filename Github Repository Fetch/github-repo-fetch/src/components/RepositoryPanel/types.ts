import { LanguageInformation } from "../LanguageTag/types";

export interface RepositoryExtraInfo {
    full_name: string;
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    archived: boolean;
    created_at: Date;
    updated_at: Date;
    languageInfo: LanguageInformation[];
}

export interface RepositoryPanelProperties {
    repository: RepositoryExtraInfo;
}
