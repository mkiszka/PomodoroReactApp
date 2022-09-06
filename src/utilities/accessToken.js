import jwt_decode from "jwt-decode";

function getUserEmail(accesToken) {
    console.log(jwt_decode(accesToken));
    const { email } = jwt_decode(accesToken);
    return email;
}

function getUserId(accesToken) {
    const { sub } = jwt_decode(accesToken);
    return sub;
}

function isExpired(accesToken) {        
    const { exp } = jwt_decode(accesToken);
    const now = new Date().getTime();

    if (exp * 1000 <= now) {
        return true;
    }
    return false;
}
export { getUserEmail, getUserId, isExpired }