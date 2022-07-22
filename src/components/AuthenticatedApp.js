import React from 'react';
import Pomodoro from "./Pomodoro";
import RealTimeClock from "./RealTimeClock";
import Header from "./Header";
import InspirationQuote from './InspirationQuote';

function AuthenticatedApp() {
    console.log("AuthenticatedApp");
    return <>
        <div className="AppHeader" >
            <Header />
            <RealTimeClock hours="10" minutes="20" />
        </div>
        <hr />
        <Pomodoro />
        <InspirationQuote className={'InpirationalQuote'} />
    </>;
}

export default AuthenticatedApp;