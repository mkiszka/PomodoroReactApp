import jwt_decode from "jwt-decode";

function getUserEmail(accesToken) {    
    if(accesToken === null) {
        return '';
    }
    
    const { email } = jwt_decode(accesToken);
    return email;
}

function getUserId(accesToken) {
    if(accesToken === null) {
        return null;
    }
    
    const { sub } = jwt_decode(accesToken);
    return sub;
}

function isExpired(accesToken) {        
    if(accesToken === null) {
        return true;
    }
    
    const { exp } = jwt_decode(accesToken);
    const now = new Date().getTime();

    if (exp * 1000 <= now) {
        return true;
    }
    return false;
}
export { getUserEmail, getUserId, isExpired }