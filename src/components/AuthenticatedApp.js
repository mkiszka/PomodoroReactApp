import React from 'react';
import Pomodoro from "./Pomodoro";
import RealTimeClock from "./RealTimeClock";
import Header from "./Header";
import InspirationQuoteManager from './InspirationQuoteManager';

function AuthenticatedApp() {
    console.log("AuthenticatedApp");
    return <>
        <div className="AppHeader" >
            <Header />
            <RealTimeClock hours="10" minutes="20" />
        </div>
        <hr />
        <Pomodoro />
        <InspirationQuoteManager className={'InpirationalQuote'} />
    </>;
}

export default AuthenticatedApp;