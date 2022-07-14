import { useDrag } from 'react-dnd';
import { useDrop } from 'react-dnd';
import {
  IoTrashOutline, IoMenu, IoSaveOutline,
  IoPlayOutline as IoPushOutline
} from "react-icons/io5";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid"
import { DraggableItemTypes } from "./DraggableItemTypes";
import React, {useState} from "react";
import EditableTimeboxListElement from './EditableTimeboxListElement';
import NonEditableTimeboxListElement from './NonEditableTimeboxListElement';
// czy o to chodziło ? komponent główny i w środku dwa, edytowalny i nie edytowlny??
//czy TimeboxListElement wywalić i ....
//TODO split into TimeboxListElement and DragableTimeboxListElement
//TODO remove uid and get it from timebox.uid
function TimeboxListElement({ timebox, onSave, onDelete, onStart, onMoveElement}) {
  //TODO tutaj ma być isEditable a nie w timebox całym obiekcie. 
  //do zdarzeń przekazywać uid wtedy findElement nie będzie potrzebny
  //ontitle change i on time change do środka
  const [ isEditable, setIsEditable ] = useState(false);  
  const uid = timebox.uid;
  // const originalIndex = findElement(uid).index

  //TODO w Pomodoro trzeba ogarnąć wysyłanie do api na onSave
  function handleEdit() {    
    setIsEditable((prevIsEditable) => {      
        return !prevIsEditable;
    })
  }

  function handleSave(newTimebox) {
      handleEdit();
      onSave(newTimebox)
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
      hover({ uid: draggedId }) {
        if (draggedId !== uid) {
          //          const { index: overIndex } = findElement(uid)
          onMoveElement(draggedId, uid) //przekazywać uid a onMoveElement ma wyszukać index
        }
      },
    }),
    [onMoveElement],
  )
  const opacity = isDragging ? 0 : 1
  //TODO jeden komponent renderuje nieedytowany timebox a drugi edytowalny (dostaje aktuanego timeboxa) 
  //VIP3 0 niestety przy zostawieniu drag tutaj, i wyciągnięciu diva tutaj, komponenty podrzędne stają się niereużywalne,
  //przez chwile myślałem o HOC ? żeby dodać drag and drop, ale jeszcze nie ogarniam
  //opcja - div tylko dla dragging ? ale jak lepiej ?
  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{ opacity }}
    >
      {isEditable ?
        <EditableTimeboxListElement
          timebox={timebox}          
          onSave={handleSave}
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

  timebox: { uid: uuidv4(), title: "Default title", totalTimeInMinutes: 3, isEditable: false },  
  onSave: () => { console.log("handle save ") },
  onDelete: () => { console.log("handle delete ") },  

}

TimeboxListElement.propTypes = {
  timebox: PropTypes.object.isRequired,  
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,  
}

export default TimeboxListElement;