import { useDrag } from 'react-dnd';
import { useDrop } from 'react-dnd';
import {
  IoTrashOutline, IoMenu, IoSaveOutline,
  IoPlayOutline as IoPushOutline
} from "react-icons/io5";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid"
import { DraggableItemTypes } from "./DraggableItemTypes";
import React from "react";

//TODO split into TimeboxListElement and DragableTimeboxListElement
//TODO remove uid and get it from timebox.uid
function TimeboxListElement({ uid, timebox, onEdit, onDelete, onTitleChange, onTimeChange, onStart,moveElement, findElement }) {
        
  const originalIndex = findElement(uid).index

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: DraggableItemTypes.TimeboxListElement,
      item: { uid, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { uid: droppedId, originalIndex } = item
        const didDrop = monitor.didDrop()
        if (!didDrop) {
          moveElement(droppedId, originalIndex)
        }
      },
    }),
    [uid, originalIndex, moveElement],
  )

  const [, drop] = useDrop(
    () => ({
      accept: DraggableItemTypes.TimeboxListElement,
      hover({ uid: draggedId }) {
        if (draggedId !== uid) {
          const { index: overIndex } = findElement(uid)
          moveElement(draggedId, overIndex)
        }
      },
    }),
    [findElement, moveElement],
  )
  const opacity = isDragging ? 0 : 1

  return (
    <div 
      ref={(node) => drag(drop(node))}
      role={"listitem"}
      className={"Timebox TimeboxListElement"}
      style={{opacity}}
      >
      <div className="TimeboxListElementTitle"><textarea disabled={!timebox.isEditable} value={timebox.title} onChange={(event) => { onTitleChange(event, originalIndex) }} /></div>
      <div className="TimeboxListElementTime"><input disabled={!timebox.isEditable} value={timebox.totalTimeInMinutes} onChange={(event) => { onTimeChange(event, originalIndex) }} type="number" />min.</div>
      <div className="TimeboxListElementAction">
        {timebox.isEditable ? (<IoSaveOutline title="zapisz" className="button-active" onClick={onEdit} />) : (<IoMenu title="edytuj" className="button-active" onClick={onEdit}></IoMenu>)}

        <IoTrashOutline title="usuń" className="button-active" onClick={onDelete} />
        <IoPushOutline title="start" className="button-active" onClick={onStart} />
      </div>
    </div>
  )
}
TimeboxListElement.defaultProps = {
    uid: '0', /* to trzreba usunąć - refaktor*/
    timebox: { uid: uuidv4(), title: "Default title", totalTimeInMinutes: 3, isEditable: false },
    onEdit: () => { console.log("handle edit ") },
    onDelete: () => { console.log("handle delete ") },
    onTitleChange: () => { console.log("handle title change ") },
    onTimeChange: () => { console.log("handle time change ") },

}

TimeboxListElement.propTypes = {
  uid: PropTypes.string.isRequired,
  timebox: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onTimeChange: PropTypes.func.isRequired
}

export default TimeboxListElement;