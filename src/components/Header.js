import React, { useContext } from 'react'
import AuthenticationContext from '../contexts/AuthenticationContext';
import UserGreeting from './UserGreeting';

function Header() {
    const { onLogout } = useContext(AuthenticationContext);
    return <>
        <h1>Pomodoro Application</h1>
        <header className="header">
            <UserGreeting /><br />
            <button onClick={onLogout} className="header__logout-link" >Wyloguj się</button>
        </header>
    </>;
}

export default Header;