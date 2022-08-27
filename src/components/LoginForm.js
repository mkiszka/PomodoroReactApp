import React, { useRef } from "react";
import { useUnauthicationContext } from "../hooks/useUnauthenticationContext";
import { IoLogInOutline } from "react-icons/io5";

function LoginForm(props) {
    //ki3 - sprawdzić refactor do funkcyjnego    
    const { onLoginAttempt } = useUnauthicationContext();
    const emailInput = useRef();
    const passwordInput = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        onLoginAttempt({
            email: emailInput.current.value,
            password: passwordInput.current.value
        });
        emailInput.current.value = "";
        passwordInput.current.value = "";
    }

    return (
        <form onSubmit={handleSubmit} className="LoginForm">
            <div>
                {props.errorMessage ?
                    <div className="LoginForm__error-message">{props.errorMessage}</div> :
                    null
                }
                <label>
                    Email
                    <input
                        ref={emailInput}
                        type="text"
                        defaultValue="bob@example.com"
                    />
                </label>
                <label>
                    Hasło
                    <input
                        ref={passwordInput}
                        type="password"
                        defaultValue="secret"
                    />
                </label>
            </div>
            <div>
                <button>
                    <IoLogInOutline className="button-active" />                    
                </button>
            </div>
        </form>
    )
}

export default LoginForm;