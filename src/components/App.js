import React, { useState } from 'react';
import ErrorBoundary from './ErrorBoundary';
import LoginForm from './LoginForm';

import AuthenticationContext from '../contexts/AuthenticationContext';
import UnauthenticationContext from '../contexts/UnauthenticationContext';

const AuthenticatedApp = React.lazy(() => import('./AuthenticatedApp'));

//IMPORTANT ! The login functionality is only a simulation.
function App() {
    const [isLogged, setIsLogged] = useState();
    const [accessToken/*, setAccessToken*/] = useState('aa-bb-cc');
    //https://stackoverflow.com/questions/41030361/how-to-update-react-context-from-inside-a-child-component
    function handleLogout() {
        setIsLogged(false);
    }


    function handleLogin(data) {
        console.log(data);
        setIsLogged(true);
    }

    return (
        <div id="App" className="App">
            <ErrorBoundary>
                {isLogged ?
                    <AuthenticationContext.Provider value={{accessToken: accessToken, onLogout: handleLogout }}>
                        <React.Suspense fallback={'Loading ...'}>
                            <AuthenticatedApp/>
                        </React.Suspense>
                    </AuthenticationContext.Provider>
                    :
                    // vip3 pytanie o w8 l3 i haczyk
                    <UnauthenticationContext.Provider value={{onLoginAttempt: handleLogin}}>
                        <LoginForm />
                    </UnauthenticationContext.Provider>
                }
            </ErrorBoundary>
        </div>
    )
}

export default App;