export const AUTH_ACTION = {
    ACCESS_TOKEN_SET: 'auth/acces_token_set',
    ACCESS_TOKEN_DELETE: 'auth/access_token_delete',
    PREVIOUS_LOGIN_ATTEMPT_FAILD: 'auth/previous_login_attempt_faild'
}
const LS_ACCESSTOKEN = 'accessToken';

export const initialState = {
    accessToken: localStorage.getItem(LS_ACCESSTOKEN),
    previousLoginAttemptFailed: false,
}
export function authentificationReducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_ACTION.ACCESS_TOKEN_SET: {
            localStorage.setItem(LS_ACCESSTOKEN, action.accessToken);
            return { ...state, accessToken: action.accessToken };
        }
        case AUTH_ACTION.ACCESS_TOKEN_DELETE: {
            localStorage.removeItem(LS_ACCESSTOKEN);
            return { ...state, accessToken: "" };
        }
        case AUTH_ACTION.PREVIOUS_LOGIN_ATTEMPT_FAILD: {
            return { ...state, previousLoginAttemptFailed: action.previousLoginAttemptFailed }
        }
        default:
            return state;
    }

}


export const setAccessToken = (accessToken) => ({ type: AUTH_ACTION.ACCESS_TOKEN_SET, accessToken });
export const deleteAccessToken = () => ({ type: AUTH_ACTION.ACCESS_TOKEN_DELETE });
export const setPreviousLoginAttemptFailed = (previousLoginAttemptFailed) => ({ type: AUTH_ACTION.PREVIOUS_LOGIN_ATTEMPT_FAILD, previousLoginAttemptFailed });

export const loginToApi = (credencials) => (dispatch, getState, { authenticationAPI }) => {    
    authenticationAPI.login(credencials)
    .then(({ accessToken, user }) => {
        dispatch(setAccessToken(accessToken))        
        dispatch(setPreviousLoginAttemptFailed(false));
    })
    .catch(() => { dispatch(setPreviousLoginAttemptFailed(true)) });
    console.log(credencials);
}


