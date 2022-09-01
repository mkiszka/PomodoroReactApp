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
import { useCallback, useEffect, useState } from "react";
import { useManagedList } from "../hooks/useManagedList";

import { useAuthenticationContext } from "../hooks/useAuthenticationContext";
import { getLoadingError, isLoadingError, isLoading, timeboxesReducer, getAllElements, getCurrentCountdownElement } from "../managedListReducer";
import { /*createSlice,*/ configureStore } from '@reduxjs/toolkit'
import { useForceUpdate } from "../hooks/useForceUpdate";

const AutoIndicator = withAutoIndicator(ProgressBar);

const timeboxesStore = configureStore ({ reducer: timeboxesReducer });


function Pomodoro() {
    const forceUpdate = useForceUpdate();
    //const [state2, dispatch2] = useReducer(timeboxesReducer, initialState/*,initializeState*/);       
    const state = timeboxesStore.getState();
    const dispatch = timeboxesStore.dispatch;
    useEffect(() => timeboxesStore.subscribe(forceUpdate), [forceUpdate]);
    
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
                {isLoadingError(state) ? <ErrorMessage error={getLoadingError(state)} /> : ""}
                {isLoading(state) ? <AutoIndicator refresh="10" /> : ""}
                <Timebox timebox={getCurrentCountdownElement(state)} />
                <TimeboxList>
                    {getAllElements(state)?.map((elem, index) => {
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