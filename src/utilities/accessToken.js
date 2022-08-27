import jwt_decode from "jwt-decode";

function getUserEmail(accesToken) {
    const { email } = jwt_decode(accesToken);
    return email;
}

function getUserId(accesToken) {
    const { sub } = jwt_decode(accesToken);
    return sub;
}

export { getUserEmail, getUserId }