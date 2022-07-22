import React from 'react';
import DetailedMessage from './DetailedMessage';

class ErrorMessage extends React.Component {

    render() {
        const { error } = this.props;        
        let summary;
        if (error instanceof Error) {
            summary = error.message;             
        } else {
            summary = error;
        }
        return (<DetailedMessage summaryMessage={summary} />);
    }
}

export default ErrorMessage;