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
import update from 'immutability-helper';

import { useAuthenticationContext } from "../hooks/useAuthenticationContext";

const AutoIndicator = withAutoIndicator(ProgressBar);
//TODO isLoading i loading error do redura
//generatory akcji i przeniesienie ich do jednego pliku (Action.js)
//selektory akcji
//dla pamięci currentTimebox na reduera zmienić i generaory oraz selektory ?
function findElement(elements, uid) {
    const element = elements.filter(
        (element) => {
            return `${element.uid}` === uid;
        }
    )[0]
    return {
        element,
        index: elements.indexOf(element),
    }
};
function timeboxesReducer(state, action) {
    switch (action.type) {
        case MANGEDLIST_ACTION.ELEMENTS_SET:
            return { ...state, elements: action.elements, currentCountdownElment: action.elements.length > 0 ? action.elements[0] : null };
        case MANGEDLIST_ACTION.ELEMENT_REMOVE: {
            const elements = state.elements.filter((value) => value.uid === action.element.uid ? false : true);
            return { ...state, elements };
        }
        case MANGEDLIST_ACTION.ELEMENT_ADD: {
            return { ...state, elements: [...state.elements, action.element] }
        }
        case MANGEDLIST_ACTION.ELEMENT_REPLACE: {
            const elements = state.elements.map((value) => { //TODOa1 tego mapa spróbować zedytować według uwag z konsultacji
                return value.uid === action.element.uid ? { ...action.element } : value
            })
            return { ...state, elements };
        }
        case MANGEDLIST_ACTION.CURRENT_COUNTDOWN_ELEMENT_SET: {
            const index = state.elements.findIndex((comparableElement) => comparableElement.uid === action.element.uid);
            //TODOa1 refactor w/w handlerów z (id) na findElement z hooka useDND ? 
            //findElement do czegoś wspólnego przenieść ?

            return { ...state, currentCountdownElment: state.elements[index] }
        }
        case MANGEDLIST_ACTION.ELEMENT_MOVE:
            {
                const { element, index } = findElement(state.elements, action.uid)
                const { /*element: atElement,*/ index: atIndex } = findElement(state.elements, action.atUid)
                const elements = update(state.elements, {
                    $splice: [
                        [index, 1],
                        [atIndex, 0, element],
                    ],
                });
                return { ...state, elements };
            }
        case MANGEDLIST_ACTION.LOADING_STATUS_FALSE: {
            debugger;
            return { ...state, isLoading: false };
        }
        case MANGEDLIST_ACTION.LOADING_STATUS_TRUE: {
            debugger;
            return { ...state, isLoading: true };
        }
        case MANGEDLIST_ACTION.LOADING_ERROR_SET: {
            return { ...state, loadingError: action.loadingError };
        }
        default:
            return state;
    }
}
const initialState = {
    elements: [],
    currentCountdownElment: null,
    isLoading: false,
    loadingError: null

}
// function initializeState(arg_initialState) { 
//     return arg_initialState;
// }
function Pomodoro() {
    const [state, dispatch] = useReducer(timeboxesReducer, initialState/*,initializeState*/);   
    const { accessToken: apiAccessToken, managedListAPI } = useAuthenticationContext();
    const {
        handleCreatorAdd: onAddTimeboxElement,
        handleDeleteListElement: onDeleteTimeboxListElement,
        handleSaveListElement: onSaveTimeboxListElement,
        handleStartListElement: onStartTimeboxListElement,
        handleMoveElement: onMoveListElement

    } = useManagedList(apiAccessToken, managedListAPI, dispatch);

    // const TimeboxAPI= useTimeboxAPI();

    //ki3 - 
    //0. czy custom hook zwracający też Portal component ?
    //1. poprawność tworzenia renderu z portlem - czy tak ułożone componenty w portalu ok?,
    //czy jako zmienna stanowa sterująca wyświetlaniem jest ok?
    //2. przekazywanie tekstu do wyświetlenia, czy forma ok?
    const [timeboxToDelete, setTimeboxToDelete] = useState(null);
    const handleConfirmDeletion = useCallback((element) => {
        setTimeboxToDelete(element);
    }, []);


    function handleCancelConfirmDeletion() {
        setTimeboxToDelete(null);
    }
    //TODO sprawdzić /react/menu dla headlessui
    //TODO confirmation modal nagranie ki3
    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <TimeboxCreator onAdd={onAddTimeboxElement} />
                {state.loadingError ? <ErrorMessage error={state.ButtonMessageloadingError} /> : ""}
                {state.isLoading ? <AutoIndicator refresh="10" /> : ""}
                <Timebox timebox={state.currentCountdownElment} />
                <TimeboxList>
                    {state.elements?.map((elem, index) => {
                        return (
                            <TimeboxListElement
                                key={elem.uid}
                                timebox={elem}
                                onSave={onSaveTimeboxListElement}
                                onDelete={handleConfirmDeletion}
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