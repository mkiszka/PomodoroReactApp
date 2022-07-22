import React from 'react';
//ki3 - a może AuthentiationContext przenieść do hooka useAuthenticationContext ?
const AuthenticationContext =
    React.createContext(
        {
            accessToken: null,
            onLogout: () => {}
        }
    );

export default AuthenticationContext;