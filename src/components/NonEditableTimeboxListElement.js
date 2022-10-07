import {
  IoTrashOutline, IoMenu,
  IoPlayOutline as IoPushOutline
} from "react-icons/io5";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid"
import React, { useCallback } from "react";

function NonEditableTimeboxListElement({ timebox, onEdit, onDelete, onStart }) {
  const handleEdit = useCallback(
    () => {
      onEdit(timebox);
    },
    [timebox, onEdit],
  );
  const handleDelete = useCallback(
    () => {
      onDelete(timebox);
    },
    [timebox, onDelete],
  )
  const handleStart = useCallback(
    () => {
      onStart(timebox)
    },
    [timebox, onStart],
  )
  
  
  return (
    <div className="flex flex-row align-bottom"
      role={"listitem"}    
      >
      <div className="w-6/12">{timebox.title}</div>
      <div className="lg:w-3/12 xl:w-2/6 px-4">{timebox.totalTimeInMinutes} min.</div>
      <div className="flex flex-row lg:w-3/12 xl:w-1/6 px-4">
        <IoMenu title="edytuj" className="button-active" onClick={handleEdit} />
        <IoTrashOutline title="usuń" className="button-active" onClick={handleDelete} />
        <IoPushOutline title="start" className="button-active" onClick={handleStart} />
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