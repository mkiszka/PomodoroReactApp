import React, { useContext } from 'react'
import AuthenticationContext from '../contexts/AuthenticationContext';
import UserGreeting from './UserGreeting';

function Header() {
    const { onLogout } = useContext(AuthenticationContext);
    return <>
        <h1>Pomodoro Application</h1>
        <header className="header">
            <UserGreeting /><br />
            <a onClick={onLogout} className="header__logout-link" href="#">Wyloguj się</a>
        </header>
    </>;
}

export default Header;