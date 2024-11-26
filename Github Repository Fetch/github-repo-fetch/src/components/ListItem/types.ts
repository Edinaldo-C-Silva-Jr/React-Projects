export interface RepositoryBasicInfo {
    name: string;
    description: string;
}

export interface ListItemProperties {
    repository: RepositoryBasicInfo;
    clickMethod: (repo: string) => void;
}
