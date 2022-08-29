import Timebox from "./Timebox";
import TimeboxList from "./TimeboxList";
import TimeboxListElement from "./TimeboxListElement";
import TimeboxCreator from "./TimeboxCreator";
import ErrorMessage from "./ErrorMessage";
import withAutoIndicator from "./AutoIndicator";
import ProgressBar from './ProgressBar';
import Portal from './Portal';
import ModalComponent from './ModalComponent';
import ButtonMessage from './ButtonMessage';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useCallback, useReducer, useState } from "react";
import { useManagedList, MANGEDLIST_ACTION } from "../hooks/useManagedList";
import { useDND } from "../hooks/useDND";

import { useAuthenticationContext } from "../hooks/useAuthenticationContext";

const AutoIndicator = withAutoIndicator(ProgressBar);
//useReducer
//wyciągnięcia wszystkich akcji do reducera
//usuwanie na podstawie uid a nie index
//do akcji przekazywać obiekty zwracane przez API - czyli jak coś usuwam to nie przekazuje indexu tylko cały obiekt usunięty i po uid go znajdę, tak samo przy zmianie i dodawaniu
//przenieść reducera i initial state do osobnego pliku, i tak żeby nie musieć eksportować initial state (inicjalizować state w reducers.js)
//
function timeboxesReducer(state,action) {
    switch (action.type) {
        case MANGEDLIST_ACTION.ELEMENTS_SET:
            return { elements: action.elements };            
    
        default:           
            return state;
    }
}
const initialState = {
    elements: [],
    
}
// function initializeState(arg_initialState) { 
//     return arg_initialState;
// }
function Pomodoro() {
    const [ state, dispatch ] = useReducer(timeboxesReducer,initialState/*,initializeState*/);
    debugger;
    const [ timeboxes, setTimeboxes] = useState([]);  
    const { apiAccessToken, managedListAPI  } = useAuthenticationContext();    
    const {   
        isLoading,
        loadingError,
        elements: currentTimebox,
        handleCreatorAdd: onAddTimeboxElement,
        handleDeleteListElement: onDeleteTimeboxListElement,
        handleSaveListElement: onSaveTimeboxListElement,
        handleStartListElement: onStartTimeboxListElement,

    } = useManagedList(timeboxes, setTimeboxes, apiAccessToken, managedListAPI, dispatch);



    //!!!!!!!!!!!!!!!!!!!!!!! useDND do poprawy dla reducera
    const [onMoveListElement/*,findElement*/] = useDND(state.elements, setTimeboxes);

    // const TimeboxAPI= useTimeboxAPI();

    //ki3 - 
    //0. czy custom hook zwracający też Portal component ?
    //1. poprawność tworzenia renderu z portlem - czy tak ułożone componenty w portalu ok?,
    //czy jako zmienna stanowa sterująca wyświetlaniem jest ok?
    //2. przekazywanie tekstu do wyświetlenia, czy forma ok?
    const [timeboxToDelete, setTimeboxToDelete] = useState(null);
    const handleConfirmDeletion = useCallback((element)  => {       
        setTimeboxToDelete(element);
    },[]);


    function handleCancelConfirmDeletion() {
        setTimeboxToDelete(null);
    }
    //TODO sprawdzić /react/menu dla headlessui
    //TODO confirmation modal nagranie ki3
    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <TimeboxCreator onAdd={onAddTimeboxElement} />
                {loadingError ? <ErrorMessage error={loadingError} /> : ""}
                {isLoading ? <AutoIndicator refresh="10" /> : ""}
                <Timebox timebox={currentTimebox} />
                <TimeboxList timeboxes={timeboxes}> {/*TODO props timeboxes raczej do uczunięcia */}
                    {state.elements?.map((elem, index) => {
                        return (
                            <TimeboxListElement
                                key={elem.uid}
                                timebox={elem}
                                onSave={ onSaveTimeboxListElement }
                                onDelete={ handleConfirmDeletion }
                                onStart={onStartTimeboxListElement}
                                onMoveElement={onMoveListElement}
                            />
                        );
                    })
                    }
                </TimeboxList>
                {timeboxToDelete ?
                    <Portal>
                        <ModalComponent>
                            <ButtonMessage
                                message={`Czy chcesz usunąć: "${timeboxToDelete.title}"`}
                                onAction={() => { onDeleteTimeboxListElement(timeboxToDelete); handleCancelConfirmDeletion(); }}
                                onCancel={handleCancelConfirmDeletion} />
                        </ModalComponent>
                    </Portal> : ""}
            </DndProvider>
        </>

    )
}

export default Pomodoro;