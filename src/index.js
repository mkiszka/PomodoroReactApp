
import React from 'react';
import ReactDOM from 'react-dom/client';
import "./styles/main.scss"

import reportWebVitals from './reportWebVitals';
import App from './components/App';
import { CookiesProvider } from 'react-cookie'
import { configureStore } from '@reduxjs/toolkit';
import { Provider as ReduxProvider } from 'react-redux';
import thunk from 'redux-thunk';
import AuthenticationAPI from './api/FetchAuthenticationAPI';
import ManagedListAPI from './api/ManagedListAPI';
import { AxiosTimeboxAPI } from './api/AxiosTimeboxAPI';
import { timeboxReducer } from './redux/timeboxReducer';
import { timeboxesReducer } from './redux/managedListReducer';
import { authentificationReducer } from './redux/authentificationReducer';

//TODO extraArgument API and accesstoken ?
// const store = configureStore({
//     reducer: rootReducer,
//     middleware: getDefaultMiddleware =>
//       getDefaultMiddleware({
//         thunk: {
//           extraArgument: {
//             api: myCustomApiService,
//             otherValue: 42
//           }
//         }
//       })

//   })

const store = configureStore({
    reducer: {
        timebox: timeboxReducer,
        timeboxList: timeboxesReducer,
        auth: authentificationReducer
    }, 
    middleware: [thunk.withExtraArgument({ authenticationAPI: AuthenticationAPI,
                                                                 managedListAPI: new ManagedListAPI(AxiosTimeboxAPI)
                                                               })]
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ReduxProvider store={store}>
            <CookiesProvider>
                <App />
            </CookiesProvider>
        </ReduxProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
