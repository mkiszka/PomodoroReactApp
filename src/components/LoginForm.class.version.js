import React from "react";
import UnauthenticationContext from "../contexts/UnauthenticationContext";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.emailInput = React.createRef();
        this.passwordInput = React.createRef();
    }
    handleSubmit = (event) => {
        event.preventDefault(); 
        this.context.onLoginAttempt({ 
            email: this.emailInput.current.value, 
            password: this.passwordInput.current.value
        });
        this.emailInput.current.value = "";
        this.passwordInput.current.value = "";
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="LoginForm">
                { this.props.errorMessage ? 
                    <div className="LoginForm__error-message">{this.props.errorMessage}</div> :
                    null
                }
                <label>
                    Email
                    <input 
                        ref={this.emailInput}
                        type="text" 
                        defaultValue="bob@example.com"
                    />
                </label><br/>
                <label>
                    Hasło
                    <input 
                        ref={this.passwordInput}
                        type="password" 
                        defaultValue="secret"
                    />
                </label><br />
                <button 
                >Zaloguj się</button>
            </form>
        )
    }
}
LoginForm.contextType = UnauthenticationContext;
export default LoginForm;