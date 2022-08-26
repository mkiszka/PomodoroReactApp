import React, { useState } from 'react';
import ErrorBoundary from './ErrorBoundary';
import LoginForm from './LoginForm';

import AuthenticationContext from '../contexts/AuthenticationContext';
import UnauthenticationContext from '../contexts/UnauthenticationContext';

import AuthenticationAPI from '../api/FetchAuthenticationAPI';

const AuthenticatedApp = React.lazy(() => import('./AuthenticatedApp'));

//IMPORTANT ! The login functionality is only a simulation.
function App() {
        
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
    const [previousLoginAttemptFailed, setPreviousLoginAttemptFailed ] = useState(false);
    const isUserLoggedIn = () => { 
        return !!accessToken;
    }


    //https://stackoverflow.com/questions/41030361/how-to-update-react-context-from-inside-a-child-component
    function handleLogout() {        
        setAccessToken(null);
        localStorage.removeItem('accessToken');
    }


    function handleLogin(credencials) {     
        AuthenticationAPI.login(credencials)
            .then(({accessToken, user})=> { 
                console.log(accessToken,user); 
                setAccessToken(accessToken);  
                localStorage.setItem('accessToken',accessToken);
            })
            .catch(()=> { setPreviousLoginAttemptFailed(true)});
        console.log(credencials);        
    }

    return (
        <div id="App" className="App">           
            <ErrorBoundary>
                {isUserLoggedIn() ?
                    <AuthenticationContext.Provider value={{ accessToken: accessToken, onLogout: handleLogout }}>
                        <React.Suspense fallback={'Loading ...'}>
                            <AuthenticatedApp />
                        </React.Suspense>
                    </AuthenticationContext.Provider>
                    :
                    // ki3 pytanie o w8 l3 i haczyk
                    <UnauthenticationContext.Provider value={{ onLoginAttempt: handleLogin }}>
                        <LoginForm errorMessage={previousLoginAttemptFailed?"Masz jakiś problem !":null} />
                    </UnauthenticationContext.Provider>
                }
            </ErrorBoundary>
        </div>
    )
}

export default App;