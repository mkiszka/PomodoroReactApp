import React from 'react'
import { useAuthenticationContext } from '../hooks/useAuthenticationContext';
import UserGreeting from './UserGreeting';

function Header() {
    const { onLogout } = useAuthenticationContext();
    return <>
        <h1>Pomodoro Application</h1>
        <header className="header">
            <UserGreeting /><br />
            <button onClick={onLogout} className="header__logout-link" >Wyloguj się</button>
        </header>
    </>;
}

export default Header;