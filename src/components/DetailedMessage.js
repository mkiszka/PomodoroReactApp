import React from 'react';
import PropTypes from 'prop-types';
import Message from './Message';

class DetailedMessage extends React.Component {
    
    render() {
        const { summaryMessage, detailsMessage } = this.props;
        return (            
                <details className='DetailedMessage'>
                    <summary role="button">{summaryMessage}</summary>
                    <Message>
                        {detailsMessage}
                    </Message>                    
                </details>                            
        );
    }
}
DetailedMessage.defaultProps = {
    summaryMessage: "Coś nie pykło!",
    detailsMessage: "Oj oj, deweloper gapa."
}
DetailedMessage.propTypes = {
    summaryMessage: PropTypes.string.isRequired,
    detailsMessage: PropTypes.string
}

export default DetailedMessage;