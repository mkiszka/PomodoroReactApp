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
import { useState } from "react";
import { useManagedList } from "../hooks/useManagedList";
import { useDND } from "../hooks/useDND";
import ManagedListAPI from "../api/ManagedListAPI";
import { AxiosTimeboxAPI } from "../api/AxiosTimeboxAPI";

const AutoIndicator = withAutoIndicator(ProgressBar);
const managedListAPI = new ManagedListAPI(AxiosTimeboxAPI);

function Pomodoro() {
    const [timeboxes, setTimeboxes] = useState([]);  
    const {
        isLoading,
        loadingError,       
        elements: currentTimebox,
        handleCreatorAdd: onAddTimeboxElement,
        handleDeleteListElement: onDeleteTimeboxListElement, 
        handleSaveListElement: onSaveTimeboxListElement, 
        handleStartListElement: onStartTimeboxListElement, 
       
     } = useManagedList(timeboxes, setTimeboxes, managedListAPI);

    const [ onMoveListElement,
        findElement] = useDND(timeboxes,setTimeboxes);

    // const TimeboxAPI= useTimeboxAPI();

    //ki3 - 
    //0. czy custom hook zwracający też Portal component ?
    //1. poprawność tworzenia renderu z portlem - czy tak ułożone componenty w portalu ok?,
    //czy jako zmienna stanowa sterująca wyświetlaniem jest ok?
    //2. przekazywanie tekstu do wyświetlenia, czy forma ok?
    const [timeboxToDelete, setTimeboxToDelete] = useState(null);
    function handleConfirmDeletion(uid) {
        setTimeboxToDelete(findElement(uid).element);
    }


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
                <TimeboxList timeboxes={timeboxes}>
                    {timeboxes?.map((elem, index) => {
                        return (
                            <TimeboxListElement
                                key={elem.uid}
                                timebox={elem}
                                onSave={onSaveTimeboxListElement/*ki3 onSave inaczej wygląda i onDelete inaczej, jak to uogólnićm z kąd wiedzieć co pisać ?
                                                                    a może powinienem przez event dawać ?*/}
                                onDelete={() => { handleConfirmDeletion(elem.uid) }}
                                onStart={() => { onStartTimeboxListElement(index) }}
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