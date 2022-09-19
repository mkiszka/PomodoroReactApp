
import React from 'react';
import ReactDOM from 'react-dom/client';
import "./styles/main.scss"
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

import reportWebVitals from './reportWebVitals';
import App from './components/App';
import { CookiesProvider } from 'react-cookie'
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './redux';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Auth from "layouts/Auth.js";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ReduxProvider store={store}>
            <CookiesProvider>
            <BrowserRouter>
                <Routes>
                {/* add routes with layouts */}
                {/* <Route path="/admin" component={Admin} /> */}
                <Route path="/auth/*" element={<Auth/>} />
                {/* add routes without layouts */}
                {/* <Route path="/landing" exact component={Landing} /> */}
                {/* <Route path="/profile" exact component={Profile} /> */}
                {/* <Route path="/" exact component={Index} /> */}
                {/* add redirect for first page */}
                <Route 
                    path="/"
                    element={<Navigate to="/auth" replace/>}
                />
                </Routes>
            </BrowserRouter>,
               
            </CookiesProvider>
        </ReduxProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
