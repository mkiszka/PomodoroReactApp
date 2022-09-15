import { useDrag } from 'react-dnd';
import { useDrop } from 'react-dnd';
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid"
import { DraggableItemTypes } from "./DraggableItemTypes";
import React, { useState } from "react";
import EditableTimeboxListElement from './EditableTimeboxListElement';
import NonEditableTimeboxListElement from './NonEditableTimeboxListElement';
import FrozeTimeboxListElement from './FrozeTimeboxListElement';
import { useDispatch, useSelector } from 'react-redux';
import { rememberOrder, updateElementsOrderToApi } from '../redux/managedListActions';

import { TIMEBOXLISTELEMENT_STATE } from '../redux/TIMEBOXLISTELEMENT_STATE';
import useUIElementState from '../hooks/useUIElementState';

//ki3 czy o to chodziło ? komponent główny i w środku dwa, edytowalny i nie edytowlny??
//     czy TimeboxListElement wywalić i ....
//TODO split into TimeboxListElement and DragableTimeboxListElement

function TimeboxListElement({ timebox, onSave, onDelete, onStart, onMoveElement }) {
  //ki4 wspólny stan isEditable i isFrozen 
  const uid = timebox.uid;
  const { getUIState, setUIState } = useUIElementState(uid);
  const uiState = useSelector(getUIState(uid));
  //const [isEditable, setIsEditable] = useState(false);
  //const [isFrozen, setIsFrozen] = useState(false);

  function handleEdit() {
    setUIState(TIMEBOXLISTELEMENT_STATE.EDITABLE);
  }
  function handleCancel() {
    setUIState(TIMEBOXLISTELEMENT_STATE.NONEDITABLE);
  }

  function handleSave(editedTimebox) {
    //setIsFrozen(true);
    // dispatch(setUIState(TIMEBOXLISTELEMENT_STATE.FROZEN));
    //ki5
    //ki4 Potrzeba wyłączenia zamrożenia componentu na czas odpytywania do API
    //przekazanie callback'a jest ok? bo myślałem o refactorze TimeboxListElement do reduxa i dispatchowanie
    //odpowiedniej akcji wraz uid componentu, ale po co ?
    onSave(editedTimebox);
  }
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: DraggableItemTypes.TimeboxListElement,
      item: () => {
        dispatch(rememberOrder());
        return { uid };
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { uid: droppedUid, } = item
        const didDrop = monitor.didDrop()
        if (didDrop) {
          dispatch(updateElementsOrderToApi('abc'))
        } else {
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
  //console.log('TimeboxListElement rendered');
  //ki3 0 niestety przy zostawieniu drag tutaj, i wyciągnięciu diva tutaj, komponenty podrzędne stają się niereużywalne,
  //przez chwile myślałem o HOC ? żeby dodać drag and drop, ale jeszcze nie ogarniam
  //opcja - div tylko dla dragging ? ale jak lepiej ?
  //TODO refaktor na jeden typ zamiast isFrozen i isEditable
  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{ opacity }}
    > {(() => {
     
      switch (uiState) {

        case TIMEBOXLISTELEMENT_STATE.EDITABLE:
          return <EditableTimeboxListElement
            timebox={timebox}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        case TIMEBOXLISTELEMENT_STATE.FROZEN:
          return <FrozeTimeboxListElement timebox={timebox} />
        case TIMEBOXLISTELEMENT_STATE.NONEDITABLE:
        default:
          return <NonEditableTimeboxListElement
            timebox={timebox}
            onEdit={handleEdit}
            onDelete={onDelete}
            onStart={onStart}
          />
      }
    })()
      }
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