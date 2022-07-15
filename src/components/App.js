import React, { useState } from "react";
import Pomodoro from "./Pomodoro";
import RealTimeClock from "./RealTimeClock";
import ErrorBoundary from "./ErrorBoundary";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import LoginForm from "./LoginForm";
//IMPORTANT ! The login functionality is only a simulation.
function App() {
    const [isLogged, setIsLogged] = useState();
    function handleLogout() {
       setIsLogged(false);
    }

    function handleLogin() {
        setIsLogged(true);
    }

    function getUserEmail() {        
        return "test@test.pl";
    }

    return (
        <div id="App" className="App">
            <ErrorBoundary>
                {isLogged ? <DndProvider backend={HTML5Backend}>
                    <div className="AppHeader" >
                        <div> {/*TODO span */}
                            <h1>Pomodoro Application</h1>
                            <header className="header">
                                Witaj {getUserEmail()}
                                <a onClick={handleLogout} className="header__logout-link" href="#">Wyloguj się</a>
                            </header>
                        </div>
                        <div>
                            <RealTimeClock hours="10" minutes="20" />
                        </div>
                    </div>
                    <hr />
                    <Pomodoro />
                </DndProvider>
                    :
                    <LoginForm onLoginAttempt={handleLogin} />
                }
            </ErrorBoundary>
        </div>
    )
}

export default App;