import React from 'react'
import AuthenticationContext from '../contexts/AuthenticationContext'
import { getUserEmail } from '../utilities/accessToken'

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

