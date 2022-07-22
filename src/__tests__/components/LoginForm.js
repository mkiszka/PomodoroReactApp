import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "../../components/LoginForm";
import UnauthenticationContext from "../../contexts/UnauthenticationContext";

describe('LoginForm', () => {    
    it('should be able to submit form and pass proper object to onSubmit event', () => {
        const handleLogin = jest.fn(/*
            (authData) => { 
                return authData
            }*/
            );
        render(<UnauthenticationContext.Provider  value={{ onLoginAttempt: handleLogin }}>
            <LoginForm />
            </UnauthenticationContext.Provider>)
        
        const email  = screen.getByLabelText('Email');
        userEvent.clear(email);
        userEvent.type(email,'test.example@domain.in.test.pl')

        const password = screen.getByLabelText('Hasło');
        userEvent.clear(password)
        userEvent.type(password,'invisible secret');
        
        const submit = screen.getByRole('button');
        userEvent.click(submit);
        expect(handleLogin.mock.lastCall[0])
            .toEqual({email: 'test.example@domain.in.test.pl', password: 'invisible secret'})
    });
});