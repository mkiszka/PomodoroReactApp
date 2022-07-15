import { IoSaveOutline } from "react-icons/io5";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid"
import React from "react";
import { useState } from "react";

function EditableTimeboxListElement({ timebox, onSave }) {

  const [insideTimebox, setInsideTimebox] = useState(timebox); //VIP <-- sprawdzić czy na pewno to się raz wykona jako default

  function handleTitleChange(event) {
    setInsideTimebox(
      (prevInsideTimeboxes) => {
        return { ...prevInsideTimeboxes, title: event.target.value };
      }
    );
  }

  function handleTotalTimeInMinutesChange(event) {
    setInsideTimebox(
      (prevInsideTimeboxes) => {
        return { ...prevInsideTimeboxes, totalTimeInMinutes: event.target.value };
      })
  }

  return (
    <div
      role={"listitem"}
      className={"Timebox TimeboxListElement"}
    >
      <div className="TimeboxListElementTitle"><textarea value={insideTimebox.title} onChange={(event) => { handleTitleChange(event) }} /></div>
      <div className="TimeboxListElementTime"><input value={insideTimebox.totalTimeInMinutes} onChange={(event) => { handleTotalTimeInMinutesChange(event) }} type="number" />min.</div>
      <div className="TimeboxListElementAction"><IoSaveOutline title="zapisz" className="button-active" onClick={() => onSave({ ...insideTimebox })} /> { /* vip3- czy poprawnie że kopie obiektu robię? */}

        {/* <IoTrashOutline title="usuń" className="button-active" onClick={onDelete} />
        <IoPushOutline title="start" className="button-active" onClick={onStart} /> */}
      </div>
    </div>
  )
}
EditableTimeboxListElement.defaultProps = {
  timebox: { uid: uuidv4(), title: "Default title", totalTimeInMinutes: 3, isEditable: false },
  onSave: () => { console.log("handle save ") },
}

EditableTimeboxListElement.propTypes = {
  timebox: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
}

export default EditableTimeboxListElement;