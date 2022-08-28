import { useContext } from "react";
import AuthenticationContext from "../contexts/AuthenticationContext";

function useAuthenticationContext() {
    const { accessToken, managedListAPI,  onLogout } = useContext(AuthenticationContext);
    //ki3 - pytanie o takie zwracanie zamiast return useContext(AuthenticationContext);
    //tak mi wygodniej bo później podowiedzi ctrl + mouse over lepiej widać.
    return { accessToken, managedListAPI, onLogout  };
}

export { useAuthenticationContext };