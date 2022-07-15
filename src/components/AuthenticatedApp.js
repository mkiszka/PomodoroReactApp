import React from 'react';
import Pomodoro from "./Pomodoro";
import RealTimeClock from "./RealTimeClock";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Header from "./Header";

function AuthenticatedApp() {
        
    return <DndProvider backend={HTML5Backend}>
        <div className="AppHeader" >
            <Header/>
            <RealTimeClock hours="10" minutes="20" />
        </div>
        <hr />
        <Pomodoro />
    </DndProvider>;
}

export default AuthenticatedApp;