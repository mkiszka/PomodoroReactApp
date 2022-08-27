import { useDrag } from 'react-dnd';
import { useDrop } from 'react-dnd';
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid"
import { DraggableItemTypes } from "./DraggableItemTypes";
import React, { useState } from "react";
import EditableTimeboxListElement from './EditableTimeboxListElement';
import NonEditableTimeboxListElement from './NonEditableTimeboxListElement';
import FrozeTimeboxListElement from './FrozeTimeboxListElement';

//ki3 czy o to chodziło ? komponent główny i w środku dwa, edytowalny i nie edytowlny??
//     czy TimeboxListElement wywalić i ....
//TODO split into TimeboxListElement and DragableTimeboxListElement

function TimeboxListElement({ timebox, onSave, onDelete, onStart, onMoveElement }) {

  const [isEditable, setIsEditable] = useState(false);
  const [isFrozen, setIsFrozen] = useState(false);

  const uid = timebox.uid;

  function handleEdit() {
    setIsEditable((prevIsEditable) => {
      return !prevIsEditable;
    })
  }
  function handleCancel() {
    setIsEditable((prevIsEditable) => {
      return false;
    })
  }
  
  function handleSave(newTimebox) {
    setIsFrozen(true);
    handleEdit();
    onSave(newTimebox).then(() => {      
      setIsFrozen(false);
    });
  }

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: DraggableItemTypes.TimeboxListElement,
      item: { uid },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { uid: droppedUid, } = item
        const didDrop = monitor.didDrop()
        if (!didDrop) {
          onMoveElement(droppedUid, uid)
        }
      },
    }),
    [uid, onMoveElement],
  )

  const [, drop] = useDrop(
    () => ({
      accept: DraggableItemTypes.TimeboxListElement,
      hover({ uid: draggedUid }) {
        if (draggedUid !== uid) {
          onMoveElement(draggedUid, uid)
        }
      },
    }),
    [onMoveElement],
  )
  const opacity = isDragging ? 0 : 1

  //ki3 0 niestety przy zostawieniu drag tutaj, i wyciągnięciu diva tutaj, komponenty podrzędne stają się niereużywalne,
  //przez chwile myślałem o HOC ? żeby dodać drag and drop, ale jeszcze nie ogarniam
  //opcja - div tylko dla dragging ? ale jak lepiej ?
  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{ opacity }}
    >
      {isFrozen ?
        <FrozeTimeboxListElement timebox={timebox} />
        :

        isEditable ?
          <EditableTimeboxListElement
            timebox={timebox}
            onSave={handleSave}
            onCancel={handleCancel}
          />
          : <NonEditableTimeboxListElement
            timebox={timebox}
            onEdit={handleEdit}
            onDelete={onDelete}
            onStart={onStart}
          />}
    </div>
  )
}

TimeboxListElement.defaultProps = {

  timebox: { uid: uuidv4(), title: "Default title", totalTimeInMinutes: 3 },
  onSave: () => { console.log("handle save ") },
  onDelete: () => { console.log("handle delete ") },

}

TimeboxListElement.propTypes = {
  timebox: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default TimeboxListElement;