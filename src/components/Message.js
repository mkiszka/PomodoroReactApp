import React from 'react';
import PropTypes from 'prop-types';

class Message extends React.Component {
    
    render() {
        const { summaryMessage, detailsMessage } = this.props;
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
Message.defaultProps = {
    summaryMessage: "Coś nie pykło!",
    detailsMessage: "Oj oj, deweloper gapa."
}
Message.propTypes = {
    summaryMessage: PropTypes.string.isRequired,
    detailsMessage: PropTypes.string
}

export default Message;