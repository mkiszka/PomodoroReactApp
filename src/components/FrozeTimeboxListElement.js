import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid"
import React from "react";

function FrozeTimeboxListElement({ timebox }) {
  
  return (
    <div      
      role={"listitem"}
      className={"Timebox TimeboxListElement"}
      >
      <div className="TimeboxListElementTitle">{timebox.title}</div>
      <div className="TimeboxListElementTime">{timebox.totalTimeInMinutes} min.</div>
      <div className="TimeboxListElementAction">     
          saving
      </div>
    </div>
  )
}
FrozeTimeboxListElement.defaultProps = {
    timebox: { uid: uuidv4(), title: "Default title", totalTimeInMinutes: 3, isEditable: false }, 
}

FrozeTimeboxListElement.propTypes = {  
  timebox: PropTypes.object.isRequired,
}

export default FrozeTimeboxListElement;