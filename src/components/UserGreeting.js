import React from 'react'
import AuthenticationContext from '../contexts/AuthenticationContext'

function UserGreeting({ accesToken }) {

    return (
        <>
            <AuthenticationContext.Consumer>
                {
                    ({accessToken}) => <>Witaj {getUserEmail(accessToken)}</>
                }
            </AuthenticationContext.Consumer>
        </>
    )
}

export default UserGreeting;

function getUserEmail(accesToken) {
    //console.log(`abc ${accesToken}`);
    if (accesToken === 'aa-bb-cc')
        return 'test@test.pl';
    throw new Error('Wrong access')
}