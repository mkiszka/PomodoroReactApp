import { useContext } from "react";
import UnauthenticationContext from "../contexts/UnauthenticationContext"

function useUnauthicationContext() {
    const { onLoginAttempt } = useContext(UnauthenticationContext);
    return { onLoginAttempt };
}
export { useUnauthicationContext }