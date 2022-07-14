import {
  IoTrashOutline, IoMenu, IoSaveOutline,
  IoPlayOutline as IoPushOutline
} from "react-icons/io5";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid"
import React from "react";

//TODO split into TimeboxListElement and DragableTimeboxListElement

function EditableTimeboxListElement({ timebox, onEdit, onSave, onDelete, onTitleChange, onTimeChange, onStart, onMoveElement, findElement }) {
  const uid = timebox.uid;
  // const originalIndex = findElement(uid).index

  const originalIndex = 0 ;//todo refactoring jako kopiwa obiektu wewnętrznego i on save przekazywać obiekt nowy timebox
  //TODO jeden komponent renderuje nieedytowany timebox a drugi edytowalny (dostaje aktuanego timeboxa) 
  return (
    <div      
      role={"listitem"}
      className={"Timebox TimeboxListElement"}     
    >
      <div className="TimeboxListElementTitle"><textarea disabled={!timebox.isEditable} value={timebox.title} onChange={(event) => { onTitleChange(event, originalIndex) }} /></div>
      <div className="TimeboxListElementTime"><input disabled={!timebox.isEditable} value={timebox.totalTimeInMinutes} onChange={(event) => { onTimeChange(event, originalIndex) }} type="number" />min.</div>
      <div className="TimeboxListElementAction"><IoSaveOutline title="zapisz" className="button-active" onClick={onSave} />

        {/* <IoTrashOutline title="usuń" className="button-active" onClick={onDelete} />
        <IoPushOutline title="start" className="button-active" onClick={onStart} /> */}
      </div>
    </div>
  )
}
EditableTimeboxListElement.defaultProps = {
  uid: '0', /* to trzreba usunąć - refaktor*/
  timebox: { uid: uuidv4(), title: "Default title", totalTimeInMinutes: 3, isEditable: false },
  onEdit: () => { console.log("handle edit ") },
  onSave: () => { console.log("handle save ") },
  onDelete: () => { console.log("handle delete ") },
  onTitleChange: () => { console.log("handle title change ") },
  onTimeChange: () => { console.log("handle time change ") },

}

EditableTimeboxListElement.propTypes = {
  uid: PropTypes.string.isRequired,
  timebox: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onTimeChange: PropTypes.func.isRequired
}

export default EditableTimeboxListElement;