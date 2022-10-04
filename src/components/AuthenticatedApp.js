import React from 'react';
import Pomodoro from "./Pomodoro";

import Header from "./Header";
import InspirationQuoteManager from './InspirationQuoteManager';
import AuthenticationContext from 'contexts/AuthenticationContext';
import { deleteAccessToken } from 'redux/authentificationReducer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

function AuthenticatedApp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function handleLogout() {
        dispatch(deleteAccessToken())
        navigate('/'); //ki5 - czy takie podejście do przekierowania z /old/login lub /auth/login jest prawidłowe
    }
    return <>
        <AuthenticationContext.Provider value={{ onLogout: handleLogout }}>
            <React.Suspense fallback={'Loading ...'}>
                {/* <Header className="AppHeader" /> */}
                {/* <hr /> */}
                {/* <Pomodoro /> */}
                <InspirationQuoteManager />
            </React.Suspense>
        </AuthenticationContext.Provider>

    </>;
}

export default AuthenticatedApp;