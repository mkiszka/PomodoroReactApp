import React from 'react'
import { useAuthenticationContext } from '../hooks/useAuthenticationContext';
import UserGreeting from './UserGreeting';
import RealTimeClock from "./RealTimeClock";
import { IoLogOutOutline } from "react-icons/io5";

function Header({className}) {
    const { onLogout } = useAuthenticationContext();
   
    return <>
        <div className={className}>         
                <h1>Pomodoro Application</h1>                        
                <UserGreeting />    
                <button className='LogoutButton' onClick={onLogout}>
                    <IoLogOutOutline className='button-active'/>
                </button>  
                <RealTimeClock hours="10" minutes="20" />
        </div>
    </>;
}

export default Header;