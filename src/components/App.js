import React, { useState } from "react";
import ErrorBoundary from "./ErrorBoundary";
import LoginForm from "./LoginForm";
import AuthenticatedApp from "./AuthenticatedApp";



//IMPORTANT ! The login functionality is only a simulation.
function App() {
    const [isLogged, setIsLogged] = useState();
    const [accesToken, setAccessToken] = useState();

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
                    <AuthenticatedApp accesToken={accesToken} onLogout={handleLogout}/>
                    :
                    <LoginForm onLoginAttempt={handleLogin} />
                }
            </ErrorBoundary>
        </div>
    )
}

export default App;