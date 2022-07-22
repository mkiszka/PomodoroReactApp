import { useContext } from "react";
import AuthenticationContext from "../contexts/AuthenticationContext";

function useAuthenticationContext() {
    const { accessToken, onLogout } = useContext(AuthenticationContext);
    //ki3 - pytanie o takie zwracanie zamiast return useContext(AuthenticationContext);
    //tak mi wygodniej bo później podowiedzi ctrl + mouse over lepiej widać.
    //chociaż bezpośrednio póki co nie mogę bo useContext to {} a hooki []
    return [accessToken, onLogout];
}

export { useAuthenticationContext };