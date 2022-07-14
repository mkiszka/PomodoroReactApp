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
import EditableTimeboxListElement from './EditableTimeboxListElement';
import NonEditableTimeboxListElement from './NonEditableTimeboxListElement';

//TODO split into TimeboxListElement and DragableTimeboxListElement
//TODO remove uid and get it from timebox.uid
function TimeboxListElement({ uid, timebox, onEdit, onSave, onDelete, onTitleChange, onTimeChange, onStart, onMoveElement, findElement }) {
  //TODO tutaj ma być isEditable a nie w timebox całym obiekcie. 
  //do zdarzeń przekazywać uid wtedy findElement nie będzie potrzebny
  //ontitle change i on time change do środka
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
          onMoveElement(droppedId, originalIndex)
        }
      },
    }),
    [uid, originalIndex, onMoveElement],
  )

  const [, drop] = useDrop(
    () => ({
      accept: DraggableItemTypes.TimeboxListElement,
      hover({ uid: draggedId }) {
        if (draggedId !== uid) {
          const { index: overIndex } = findElement(uid)
          onMoveElement(draggedId, overIndex) //przekazywać uid a onMoveElement ma wyszukać index
        }
      },
    }),
    [findElement, onMoveElement],
  )
  const opacity = isDragging ? 0 : 1
  //TODO jeden komponent renderuje nieedytowany timebox a drugi edytowalny (dostaje aktuanego timeboxa) 
  return (<>
    {timebox.isEditable?<EditableTimeboxListElement
      timebox={timebox}
      onEdit={onEdit}
      onSave={onSave}
      onTitleChange={onTitleChange}
      onTimeChange={onTimeChange}
      onMoveElement={onMoveElement}
      findElement={findElement} />
    : <NonEditableTimeboxListElement
      timebox={timebox}
      onEdit={onEdit}
      onDelete={onDelete}
      onStart={onStart}
    />}
  </>
  )
}
TimeboxListElement.defaultProps = {
  uid: '0', /* to trzreba usunąć - refaktor*/
  timebox: { uid: uuidv4(), title: "Default title", totalTimeInMinutes: 3, isEditable: false },
  onEdit: () => { console.log("handle edit ") },
  onSave: () => { console.log("handle save ") },
  onDelete: () => { console.log("handle delete ") },
  onTitleChange: () => { console.log("handle title change ") },
  onTimeChange: () => { console.log("handle time change ") },

}

TimeboxListElement.propTypes = {
  uid: PropTypes.string.isRequired,
  timebox: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onTimeChange: PropTypes.func.isRequired
}

export default TimeboxListElement;