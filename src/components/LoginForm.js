import React from "react";
import { IoLogInOutline } from "react-icons/io5";
import { useLoginForm } from "../hooks/useLoginForm";
function LoginForm(props) {

    const { emailInput, passwordInput, handleSubmit } = useLoginForm();

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