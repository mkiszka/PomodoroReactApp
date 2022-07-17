import React from 'react'
import PropTypes from 'prop-types'
import Message from './Message'
import { MdCheckCircleOutline, MdOutlineCancel } from 'react-icons/md'

const ButtonMessage = ({message, buttonTitle, onCancel, onAction}) => {
  return (<div className='ButtonMassage'>
        <Message>
            {message}            
        </Message>
        <div>
        {onAction?<MdCheckCircleOutline role="button" onClick={onAction}/>:""}
        {onCancel?<MdOutlineCancel role="button" onClick={onCancel}/>:""}        
        </div>
    </div>    
  )
}

ButtonMessage.propTypes = {
    message: PropTypes.string.isRequired,
    buttonTitle: PropTypes.string.isRequired
}

ButtonMessage.defaultProps = {
    buttonTitle: 'close',
    onAction: null,
    onCancel: null
}

export default ButtonMessage