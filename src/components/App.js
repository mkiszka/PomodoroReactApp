import React, { useState } from "react";
import ErrorBoundary from "./ErrorBoundary";
import LoginForm from "./LoginForm";
import AuthenticatedApp from "./AuthenticatedApp";
import AuthenticationContext from "../contexts/AuthenticationContext";



//IMPORTANT ! The login functionality is only a simulation.
function App() {
    const [isLogged, setIsLogged] = useState();
    const [accessToken, setAccessToken] = useState('aa-bb-cc');
    //https://stackoverflow.com/questions/41030361/how-to-update-react-context-from-inside-a-child-component
    function handleLogout() {
        setIsLogged(false);
    }


    function handleLogin() {
        setIsLogged(true);
    }

    return (
        <div id="App" className="App">
            <ErrorBoundary>
                {isLogged ?
                    <AuthenticationContext.Provider value={{accessToken: accessToken, onLogout: handleLogout }}>
                        <AuthenticatedApp/>
                    </AuthenticationContext.Provider>
                    :
                    <LoginForm onLoginAttempt={handleLogin} />
                }
            </ErrorBoundary>
        </div>
    )
}

export default App;