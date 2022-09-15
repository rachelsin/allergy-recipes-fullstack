import jwtDecode from "jwt-decode";

const tokenKey = "token";

export function getJwt() {
    return localStorage.getItem(tokenKey);
}

export function logout() {
    localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
    } catch (ex) {
        return null;
    }
}

export default { getCurrentUser, logout, getJwt, };