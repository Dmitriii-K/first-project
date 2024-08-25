export enum SortDirection {
    asc,
    desc,
}

export type EmailConfirmationType = {
    confirmationCode: string;
    expirationDate: string;
    isConfirmed: boolean;
}
export type UserDBModel = {
    login: string;
    password: string;
    email: string;
    createdAt: string;
    // emailConfirmation: EmailConfirmationType;
}

