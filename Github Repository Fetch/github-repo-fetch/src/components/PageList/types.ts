export interface PaginationInfo {
    itemsPerPage: number;
    repositoryAmount: number;
    changePage: (page: number) => void;
}
