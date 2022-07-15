import React from 'react';

const AuthenticationContext =
    React.createContext(
        {
            accessToken: null,
            onLogout: () => {}
        }
    );

export default AuthenticationContext;