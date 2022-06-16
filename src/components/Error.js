import React from "react";
import ErrorMessage from "./ErrorMessage";

class Error extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: "",
            errorInfo: ""
        }

    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {    
        //log to log service    
    }

    render() {
        if (this.state.hasError) {        
            const { error } = this.state;
            return (<ErrorMessage  error={error}/>)
        } else {
            return this.props.children;
        }
    }
}
export default Error;