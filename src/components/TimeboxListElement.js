import React from "react";
import { useDrag } from 'react-dnd'
import {
  IoTrashOutline, IoMenu, IoSaveOutline,
  IoPlayOutline as IoPushOutline
} from "react-icons/io5";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid"
import { DraggableItemTypes } from "./DraggableItemTypes";

function TimeboxListElement({ index, timebox, onEdit, onDelete, onTitleChange, onTimeChange, onStart }) {
  //console.log("render TimeboxListElement");        

  const [{ opacity }, drag] = useDrag(
    () => ({
      type: DraggableItemTypes.TimeboxListElement,
      item: { index },
      end(item, monitor) {
        const dropResult = monitor.getDropResult()
        if (item && dropResult) {
          let alertMessage = ''
          const isDropAllowed =
            dropResult.allowedDropEffect === 'any' ||
            dropResult.allowedDropEffect === dropResult.dropEffect
          if (isDropAllowed) {
            const isCopyAction = dropResult.dropEffect === 'copy'
            const actionName = isCopyAction ? 'copied' : 'moved'
            alertMessage = `You ${actionName} ${item.name} into ${dropResult.name}!`
          } else {
            alertMessage = `You cannot ${dropResult.dropEffect} an item into the ${dropResult.name}`
          }
          alert(alertMessage)
        }
      },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [index],
  )

  return (
    <div 
      ref={drag}
      role={"listitem"}
      className={"Timebox TimeboxListElement"}>
      <div className="TimeboxListElementTitle"><textarea disabled={!timebox.isEditable} value={timebox.title} onChange={(event) => { onTitleChange(event, index) }} /></div>
      <div className="TimeboxListElementTime"><input disabled={!timebox.isEditable} value={timebox.totalTimeInMinutes} onChange={(event) => { onTimeChange(event, index) }} type="number" />min.</div>
      <div className="TimeboxListElementAction">
        {timebox.isEditable ? (<IoSaveOutline title="zapisz" className="button-active" onClick={onEdit} />) : (<IoMenu title="edytuj" className="button-active" onClick={onEdit}></IoMenu>)}

        <IoTrashOutline title="usuń" className="button-active" onClick={onDelete} />
        <IoPushOutline title="start" className="button-active" onClick={onStart} />
      </div>
    </div>
  )
}
TimeboxListElement.defaultProps = {
    index: 0,
    timebox: { uid: uuidv4(), title: "Default title", totalTimeInMinutes: 3, isEditable: false },
    onEdit: () => { console.log("handle edit ") },
    onDelete: () => { console.log("handle delete ") },
    onTitleChange: () => { console.log("handle title change ") },
    onTimeChange: () => { console.log("handle time change ") },

}

TimeboxListElement.propTypes = {
  index: PropTypes.number.isRequired,
  timebox: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onTimeChange: PropTypes.func.isRequired
}

export default TimeboxListElement;