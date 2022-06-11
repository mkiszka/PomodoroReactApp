import React from "react";
import Pomodoro from "./Pomodoro";

function App() {
    const totalTimeInSeconds = 3;
    return (<div id="App" className="App">
        <h1>Pomodoro Application</h1>
        <hr />
        <Pomodoro />

    </div>);
}

export default App;