import React from 'react';
import Message from './Message';

class ErrorMessage extends React.Component {

    render() {
        const { error } = this.props;        
        let summary;
        if (error instanceof Error) {
            summary = error.message;             
        } else {
            summary = error;
        }
        return (<Message summaryMessage={summary} />);
    }
}

export default ErrorMessage;