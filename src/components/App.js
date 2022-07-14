import React from "react";
import Pomodoro from "./Pomodoro";
import RealTimeClock from "./RealTimeClock";
import ErrorBoundary from "./ErrorBoundary";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {    
    return (
        <div id="App" className="App">
            <ErrorBoundary>
                <DndProvider backend={HTML5Backend}>
                    <div className="AppHeader" >
                        <div> {/*TODO span */}
                            <h1>Pomodoro Application</h1>
                        </div>
                        <div>
                            <RealTimeClock hours="10" minutes="20" />
                        </div>
                    </div>
                    <hr />
                    <Pomodoro />
                </DndProvider>
            </ErrorBoundary>
        </div>
    )
}

export default App;