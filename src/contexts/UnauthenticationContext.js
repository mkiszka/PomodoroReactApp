import React from 'react'

const UnauthenticationContext = React.createContext({
    onLoginAttempt: () => {}
})

export default UnauthenticationContext;