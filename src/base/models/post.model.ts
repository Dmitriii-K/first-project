import { SortDirection } from "../types/user.types";

export const postPagination = (query: {
    [key: string]: string | number | undefined;
}): any => {
    return {
    pageNumber: query.pageNumber ? +query.pageNumber : 1,
    pageSize: query.pageSize ? +query.pageSize : 10,
    sortBy: query.sortBy ? query.sortBy : "createdAt",
    sortDirection: query.sortDirection
        ? (query.sortDirection as SortDirection)
        : "desc",
    searchNameTerm: query.searchNameTerm ? query.searchNameTerm : null,
    };
}