import React, { /*useReducer,*/ useState } from 'react';
import ErrorBoundary from './ErrorBoundary';
import LoginForm from './LoginForm';

import AuthenticationContext from '../contexts/AuthenticationContext';
import UnauthenticationContext from '../contexts/UnauthenticationContext';

import AuthenticationAPI from '../api/FetchAuthenticationAPI';
import ManagedListAPI from "../api/ManagedListAPI";
import { AxiosTimeboxAPI } from "../api/AxiosTimeboxAPI";

const AuthenticatedApp = React.lazy(() => import('./AuthenticatedApp'));
const LS_ACCESSTOKEN = 'accessToken';
//function stateReducer = (state,action) => newState;

function App() {
        
   
    const [accessToken, setAccessToken] = useState(localStorage.getItem(LS_ACCESSTOKEN));
    const [previousLoginAttemptFailed, setPreviousLoginAttemptFailed ] = useState(false);
    // const [state, dispatch] = useReducer(applicationStateReducer,{
    //     accessToken: localStorage.getItem(LS_ACCESSTOKEN),
    //     previousLoginAttemptFailed: false
    // })
    const isUserLoggedIn = () => { 
        return !!accessToken;
    }


    //https://stackoverflow.com/questions/41030361/how-to-update-react-context-from-inside-a-child-component
    function handleLogout() {        
        setAccessToken(null);
        localStorage.removeItem(LS_ACCESSTOKEN);
    }


    function handleLogin(credencials) {     
        AuthenticationAPI.login(credencials)
            .then(({accessToken, user})=> { 
                setAccessToken(accessToken);  
                localStorage.setItem(LS_ACCESSTOKEN,accessToken);
            })
            .catch(()=> { setPreviousLoginAttemptFailed(true)});
        console.log(credencials);        
    }

    return (
        <div id="App" className="App">           
            <ErrorBoundary>
                {isUserLoggedIn() ?
                //ki4 - czy trzymanie API w contexcie to dobry pomysł? Np gdy używawm mangedListApi w różnych miejscach to nie muszę apamiętać co za każdym razem do konstruktora przekazywać
                //gdyby to była większa konfiguracja to by trzeba było za każdym razem tworzyć od nowa.
                    <AuthenticationContext.Provider value={{ accessToken: accessToken, onLogout: handleLogout,managedListAPI: new ManagedListAPI(AxiosTimeboxAPI)  }}>
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