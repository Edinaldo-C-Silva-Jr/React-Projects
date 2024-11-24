export interface GithubUserInfo {
    id: number;
    avatar_url: string;
    name: string;
    login: string;
    html_url: string;
}

export interface GithubUserProperty {
    githubUser: GithubUserInfo;
}
