import { SortDirection } from "../types/user.types";

export const userPagination = (query: {
    [key: string]: string | number | undefined;
}): any => {
    return {
    pageNumber: query.pageNumber ? +query.pageNumber : 1,
    pageSize: query.pageSize ? +query.pageSize : 10,
    sortBy: query.sortBy ? query.sortBy : "createdAt",
    sortDirection: query.sortDirection
        ? (query.sortDirection as SortDirection)
        : "desc",
    searchLoginTerm: query.searchLoginTerm ? query.searchLoginTerm : null,
    searchEmailTerm: query.searchEmailTerm ? query.searchEmailTerm : null,
    };
};