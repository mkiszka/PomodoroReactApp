import { useDrag } from 'react-dnd';
import { useDrop } from 'react-dnd';
import {
  IoTrashOutline, IoMenu, IoSaveOutline,
  IoPlayOutline as IoPushOutline
} from "react-icons/io5";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid"
import React from "react";

//TODO split into TimeboxListElement and DragableTimeboxListElement

function NonEditableTimeboxListElement({ timebox, onEdit, onDelete, onStart }) {
  
//TODO jeden komponent renderuje nieedytowany timebox a drugi edytowalny (dostaje aktuanego timeboxa) 
  return (
    <div      
      role={"listitem"}
      className={"Timebox TimeboxListElement"}
      >
      <div className="TimeboxListElementTitle">{timebox.title}</div>
      <div className="TimeboxListElementTime">{timebox.totalTimeInMinutes} min.</div>
      <div className="TimeboxListElementAction">
        <IoMenu title="edytuj" className="button-active" onClick={onEdit} />
        <IoTrashOutline title="usuń" className="button-active" onClick={onDelete} />
        <IoPushOutline title="start" className="button-active" onClick={onStart} />
      </div>
    </div>
  )
}
NonEditableTimeboxListElement.defaultProps = {
    timebox: { uid: uuidv4(), title: "Default title", totalTimeInMinutes: 3, isEditable: false },
    onEdit: () => { console.log("handle edit ") },
    onDelete: () => { console.log("handle delete ") },    
}

NonEditableTimeboxListElement.propTypes = {  
  timebox: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,  
  onDelete: PropTypes.func.isRequired,  
}

export default NonEditableTimeboxListElement;