import React from 'react'
import AuthenticationContext from '../contexts/AuthenticationContext'
import jwt_decode from "jwt-decode";

function UserGreeting({ accesToken }) {

    return (
        <p>
            <AuthenticationContext.Consumer>
                {
                    ({accessToken}) => <>{getUserEmail(accessToken)}</>
                }
            </AuthenticationContext.Consumer>
        </p>
    )
}

export default UserGreeting;

function getUserEmail(accesToken) {       
    const { email } =  jwt_decode(accesToken);    
    return email;
}