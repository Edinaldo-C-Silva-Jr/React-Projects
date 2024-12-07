import { RepositoryBasicInfo } from "../ListItem/types";

export interface GithubUserInfo {
    id: number;
    avatar_url: string;
    name: string;
    login: string;
    html_url: string;
    repos: RepositoryBasicInfo[];
}

export interface GithubUserProperty {
    githubUser: GithubUserInfo;
}
