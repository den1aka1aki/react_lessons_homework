
const TOKEN_KEY = 'jwt-token';
const REFRESH_KEY = 'jwt-refresh-token';
const EXPIRES_KEY = 'jwt-expires';
const USERID_KEY = 'user-local-id';

export function setTokens ({ refreshToken, idToken, localId, expiresIn = 3600 }) {
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(TOKEN_KEY, idToken);
    localStorage.setItem(USERID_KEY, localId);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem(EXPIRES_KEY, expiresDate);
}

export function getAccessToken () {
    return localStorage.getItem(TOKEN_KEY);
}
export function getRefreshToken () {
    return localStorage.getItem(REFRESH_KEY);
}
export function getExpiresDate () {
    return localStorage.getItem(EXPIRES_KEY);
}
export function removeAuthData () {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USERID_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(EXPIRES_KEY);
}
export function getUserID () {
    return localStorage.getItem(USERID_KEY);
}

const localStorageService = {
    setTokens,
    getAccessToken,
    getRefreshToken,
    getExpiresDate,
    getUserID,
    removeAuthData
};

export default localStorageService;
