import React from 'react'

function UserGreeting({accesToken}) {
    
    return <>Witaj {getUserEmail(accesToken)}</>
}

export default UserGreeting;

function getUserEmail(accesToken) {
    return 'test@test.pl';
}