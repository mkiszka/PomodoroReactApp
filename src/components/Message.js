import React from 'react';

class Message extends React.Component {
    
    render() {
        const { summaryMessage = "Coś nie pykło!", detailsMessage="Oj oj, deweloper gapa." } = this.props;
        return (            
                <details className='Message'>
                    <summary>{summaryMessage}</summary>
                    <p>
                        {detailsMessage}
                    </p>
                </details>                            
        );
    }
}

export default Message;