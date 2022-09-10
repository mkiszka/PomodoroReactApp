import { isExpired } from "../utilities/accessToken";

export const getAccessToken = (state) => state.auth.accessToken;
export const getPreviousLoginAttemptFailed = (state) => state.auth.previousLoginAttemptFailed
export const isAccessTokenExpired = (state) => !isExpired(state.auth.accessToken);