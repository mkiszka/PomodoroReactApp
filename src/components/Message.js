import React from 'react';
import PropTypes from 'prop-types';

class Message extends React.Component {

    render() {
        const { children } = this.props;
        return (
            <p role="textbox">
                {children}
            </p>
        );
    }
}
Message.defaultProps = {
    children: "Oj oj, deweloper gapa."
}
Message.propTypes = {
    children: PropTypes.string.isRequired
}

export default Message;