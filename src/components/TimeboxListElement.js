import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid"
import React from "react";
import EditableTimeboxListElement from './EditableTimeboxListElement';
import NonEditableTimeboxListElement from './NonEditableTimeboxListElement';
import FrozeTimeboxListElement from './FrozeTimeboxListElement';

import { TIMEBOXLISTELEMENT_STATE } from '../redux/TIMEBOXLISTELEMENT_STATE';
import useUIElementState from '../hooks/useUIElementState';
import { CardContent } from 'layouts/cards/CardContent';
import { useSelector } from "react-redux";

//ki3 czy o to chodziło ? komponent główny i w środku dwa, edytowalny i nie edytowlny??
//     czy TimeboxListElement wywalić i ....
//TODO split into TimeboxListElement and DragableTimeboxListElement

function TimeboxListElement({ timebox, onSave, onDelete, onStart }) {
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
    //ki5 - zmiana stanu frozen jest teraz w managedListReducer
    //i tu jest mały problem. bo jest to miejsce oderwane od TimeboxListElement, gdzie jego stan jest zmieniany
    //wcześniej w onSave miałem callback i było wiadomo tutaj, że coś się zmienia    
    onSave(editedTimebox);
  }
 
  //console.log('TimeboxListElement rendered');
  //ki3 0 niestety przy zostawieniu drag tutaj, i wyciągnięciu diva tutaj, komponenty podrzędne stają się niereużywalne,
  //przez chwile myślałem o HOC ? żeby dodać drag and drop, ale jeszcze nie ogarniam
  //opcja - div tylko dla dragging ? ale jak lepiej ?
  //TODO refaktor na jeden typ zamiast isFrozen i isEditable
  return <TimeboxListElementState state={uiState} timebox={timebox} onSave={handleSave} onCancel={handleCancel} onEdit={handleEdit} onDelete={onDelete} onStart={onStart} />;
}
//TODO - na zewnątrz
function TimeboxListElementState({
  state,
  timebox,
  onSave, 
  onCancel,
  onEdit, 
  onDelete, 
  onStart,

}) {


  switch (state) {
    //<DIV_D&D>
    case TIMEBOXLISTELEMENT_STATE.EDITABLE:
      return <CardContent>
          <EditableTimeboxListElement
            timebox={timebox}
            onSave={onSave}
            onCancel={onCancel}
          />
        </CardContent>
    case TIMEBOXLISTELEMENT_STATE.FROZEN:
      return <CardContent><FrozeTimeboxListElement timebox={timebox} /></CardContent>
    case TIMEBOXLISTELEMENT_STATE.NONEDITABLE:
    default:
      return <CardContent><NonEditableTimeboxListElement
        timebox={timebox}
        onEdit={onEdit}
        onDelete={onDelete}
        onStart={onStart}
      /></CardContent>
  }

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