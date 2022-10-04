import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import LoginForm from './LoginForm';
import { BrowserRouter, Route, Routes, Navigate, redirect, useNavigate } from 'react-router-dom';

import Auth from "layouts/Auth.js";

import UnauthenticationContext from '../contexts/UnauthenticationContext';

import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getPreviousLoginAttemptFailed, isAccessTokenExpired } from '../redux/authentificationActions';
import { deleteAccessToken, loginToApi } from '../redux/authentificationReducer';

const Authenticated = React.lazy(() => import('../layouts/Authenticated'));

//function stateReducer = (state,action) => newState;

function App() {
    
    const dispatch = useDispatch();
    const previousLoginAttemptFailed = useSelector(getPreviousLoginAttemptFailed);
    const isUserLoggedIn = useSelector(isAccessTokenExpired, shallowEqual);
    const navigate = useNavigate();

    function handleLogin(credencials) {       
        dispatch(loginToApi(credencials));
        navigate('/'); //ki5 - czy takie podejście do przekierowania z /old/login lub /auth/login jest prawidłowe
    }

    return (

        <ErrorBoundary>
            {/*                
                    <UnauthenticationContext.Provider value={{ onLoginAttempt: handleLogin }}>
                        <LoginForm errorMessage={previousLoginAttemptFailed ? "Masz jakiś problem !" : null} />
                    </UnauthenticationContext.Provider>
                */}
            
                <Routes>
                    {/* add routes with layouts */}
                    {/* <Route path="/admin" component={Admin} /> */}
                    <Route path="/auth/*" element={<UnauthenticationContext.Provider value={{ onLoginAttempt: handleLogin }}><Auth /></UnauthenticationContext.Provider>} />
                    <Route path="/oldLogin" element={<UnauthenticationContext.Provider value={{ onLoginAttempt: handleLogin }}><LoginForm errorMessage={previousLoginAttemptFailed ? "Masz jakiś problem !" : null} /></UnauthenticationContext.Provider>} />
                    <Route path="/manageYourTime/*" element={<Authenticated/>} />
                    {/* add routes without layouts */}
                    {/* <Route path="/landing" exact component={Landing} /> */}
                    {/* <Route path="/profile" exact component={Profile} /> */}
                    {/* <Route path="/" exact component={Index} /> */}
                    {/* add redirect for first page */}
                    {isUserLoggedIn ?
                        <Route
                            path="/"
                            element={<Navigate to="/manageYourTime" replace />}
                        />

                        :
                        <Route
                            path="/"
                            element={<Navigate to="/auth" replace />}
                        />
                    }
                </Routes>
   
        </ErrorBoundary>
    )
}

export default App;