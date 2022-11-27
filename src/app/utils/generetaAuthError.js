export function generetaAuthError (message) {
    switch (message) {
    case 'INVALID_PASSWORD' :
        return 'Пользователь или пароль введены не верно';
    case 'EMAIL_EXISTS' :
        return 'Пользователь с таким Email уже существует';

    default:
        return 'Слишком много попыток входа. Попробуйте позже';
    }
}
