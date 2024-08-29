export class LoginInputModel {
    loginOrEmail: string;
    password: string;
}

export class RegistrationEmailResending {
    email: string;
}

export class NewPasswordRecoveryInputModel {
    newPassword: string;
    recoveryCode: string
}

export class RegistrationConfirmationCodeModel {
    code: string;
}

export class MeViewModel {
    email:	string;
    login:	string;
    userId:	string;
}