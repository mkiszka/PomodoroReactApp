import CurrentTimebox from "./CurrentTimebox";
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
import { useCallback,  useState } from "react";
import { useManagedList } from "../hooks/useManagedList";

import { useAuthenticationContext } from "../hooks/useAuthenticationContext";
import { getLoadingError, isLoadingError, isLoading, getAllElements, getCurrentCountdownElement } from "../redux/managedListReducer";
import { useDispatch, useSelector } from "react-redux/es/exports";


const AutoIndicator = withAutoIndicator(ProgressBar);

function Pomodoro() {        
    const dispatch = useDispatch();    
    
    const { accessToken: apiAccessToken, managedListAPI } = useAuthenticationContext();

   

    const {        
        handleAddListElement: onAddTimeboxElement,
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
    //ki4 nazewnictwo
    const loading = useSelector(isLoading);
    const hasLoadingError = useSelector(isLoadingError);
    const loadingError = useSelector(getLoadingError);
    const currentCountdownElment = useSelector(getCurrentCountdownElement);
    const elements = useSelector(getAllElements);
    //TODO sprawdzić /react/menu dla headlessui
    //TODO confirmation modal nagranie ki3
    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <TimeboxCreator onAdd={onAddTimeboxElement} />
                {hasLoadingError ? <ErrorMessage error={loadingError} /> : ""}
                {loading ? <AutoIndicator refresh="10" /> : ""}
                <CurrentTimebox timebox={currentCountdownElment} />
                <TimeboxList>
                    {elements?.map((elem, index) => {
                        elem.order = index;
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