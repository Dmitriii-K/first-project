export type TypeUserPagination = {
    searchLoginTerm: string;
    searchEmailTerm: string;
    sortBy: string;
    sortDirection: string;
    pageNumber: number;
    pageSize: number;
}

export type UserInputModel = {
    login: string;
    password: string;
    email: string;
}