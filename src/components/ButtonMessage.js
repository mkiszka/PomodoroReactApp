import React from 'react'
import PropTypes from 'prop-types'
import Message from './Message'

const ButtonMessage = ({message, buttonTitle}) => {
  return (<div className='ButtonMassage'>
        <Message>
            {message}            
        </Message>
        <button>{buttonTitle}</button>
    </div>    
  )
}

ButtonMessage.propTypes = {
    message: PropTypes.string.isRequired,
    buttonTitle: PropTypes.string.isRequired
}

ButtonMessage.defaultProps = {
    buttonTitle: 'close'
}

export default ButtonMessage