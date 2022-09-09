import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import LoginForm from './LoginForm';

import AuthenticationContext from '../contexts/AuthenticationContext';
import UnauthenticationContext from '../contexts/UnauthenticationContext';


import ManagedListAPI from "../api/ManagedListAPI";
import { AxiosTimeboxAPI } from "../api/AxiosTimeboxAPI";

import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken, getPreviousLoginAttemptFailed, isAccessTokenExpired } from '../redux/authentificationActions';
import { deleteAccessToken, loginToApi } from '../redux/authentificationReducer';

const AuthenticatedApp = React.lazy(() => import('./AuthenticatedApp'));

//function stateReducer = (state,action) => newState;

function App() {
    const dispatch = useDispatch();
    const accessToken = useSelector(getAccessToken);    
    const previousLoginAttemptFailed = useSelector(getPreviousLoginAttemptFailed);    
    const isUserLoggedIn = useSelector(isAccessTokenExpired);
                            
    function handleLogout() {
        dispatch(deleteAccessToken())        
    }

    function handleLogin(credencials) {
       dispatch(loginToApi(credencials));
    }

    return (
        <div id="App" className="App">
            <ErrorBoundary>
                {isUserLoggedIn ?
                    //ki4 - czy trzymanie API w contexcie to dobry pomysł? Np gdy używawm mangedListApi w różnych miejscach to nie muszę apamiętać co za każdym razem do konstruktora przekazywać
                    //gdyby to była większa konfiguracja to by trzeba było za każdym razem tworzyć od nowa.
                    <AuthenticationContext.Provider value={{ accessToken: accessToken, onLogout: handleLogout, managedListAPI: new ManagedListAPI(AxiosTimeboxAPI) }}>
                        <React.Suspense fallback={'Loading ...'}>
                            <AuthenticatedApp />
                        </React.Suspense>
                    </AuthenticationContext.Provider>
                    :
                    // ki3 pytanie o w8 l3 i haczyk
                    <UnauthenticationContext.Provider value={{ onLoginAttempt: handleLogin }}>
                        <LoginForm errorMessage={previousLoginAttemptFailed ? "Masz jakiś problem !" : null} />
                    </UnauthenticationContext.Provider>
                }
            </ErrorBoundary>
        </div>
    )
}

export default App;