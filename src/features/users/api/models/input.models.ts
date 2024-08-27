export class TypeUserPagination { // или Интерфейс?
    searchLoginTerm: string;
    searchEmailTerm: string;
    sortBy: string;
    sortDirection: string;
    pageNumber: number;
    pageSize: number;
}

export class UserInputModel {
    login: string;
    password: string;
    email: string;
}