import React from "react";
import Pomodoro from "./Pomodoro";
import RealTimeClock from "./RealTimeClock";

function App() {
    const totalTimeInSeconds = 3;
    return (<div id="App" className="App">
        <div className="AppHeader" >
            <div>
                <h1>Pomodoro Application</h1>
            </div>
            <div><RealTimeClock hours="10" minutes="20" />
            </div>
        </div>
        <hr />
        <Pomodoro />

    </div>);
}

export default App;