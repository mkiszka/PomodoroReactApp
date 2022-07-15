import React from 'react'
import UserGreeting from './UserGreeting';

function Header({onLogout}) {

    return <>
        <h1>Pomodoro Application</h1>
        <header className="header">
            <UserGreeting /><br />
            <a onClick={onLogout} className="header__logout-link" href="#">Wyloguj się</a>
        </header>
    </>;
}

export default Header;