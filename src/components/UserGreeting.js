import React from 'react'
import { useSelector } from 'react-redux'
import { getAccessToken } from '../redux/authentificationActions'
import { getUserEmail } from '../utilities/accessToken'

function UserGreeting() {
    const accessToken = useSelector(getAccessToken)
    return (
        <p>{getUserEmail(accessToken)}</p>
    )
}

export default UserGreeting;

