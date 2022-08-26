import React from 'react';
import Pomodoro from "./Pomodoro";

import Header from "./Header";
import InspirationQuoteManager from './InspirationQuoteManager';

function AuthenticatedApp() {
    console.log("AuthenticatedApp");
    return <>        
        <Header className="AppHeader"/>                
        <hr />
        <Pomodoro />
        <InspirationQuoteManager/>
    </>;
}

export default AuthenticatedApp;