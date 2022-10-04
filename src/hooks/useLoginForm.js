import { useRef } from "react";
import { useUnauthicationContext } from "./useUnauthenticationContext";

export function useLoginForm() {
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
    };

    return { emailInput, passwordInput, handleSubmit };
}
