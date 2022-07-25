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
import { useTimeboxCreator } from '../hooks/useTimeboxCreator';
import { useManagedList } from '../hooks/useManagedList';
import { useState } from "react";

const AutoIndicator = withAutoIndicator(ProgressBar);
function Pomodoro() {
    
    const [
        isLoading,
        loadingError,
        timeboxes, 
        setTimeboxes, //ki3 setTimeboxes pobierane z useTimebox i przekazyane do useTimeboxCreator. Obawiam się, że zamiszałem ?
        currentTimebox,

        handleDeleteTimeboxListElement, //ki3 trzy poniższe i pytanie
        handleSaveTimeboxListElement, //czy tu handle*
        onStartTimeboxListElement, //czy on*coś tam
        handleMoveListElement,
        findElement
        handleDeleteTimeboxListElement,
        handleSaveTimeboxListElement,
        onStartTimeboxListElement,
        findElement,
        handleMoveElement
        
    
    ] = useManagedList();
    // const TimeboxAPI= useTimeboxAPI();
   
    //ki3 - 
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

    //TODO customhook to co dotyka tablicy timeboxów (nagranie ki2 końcówka)
       
    const [ onAdd ] = useTimeboxCreator(setTimeboxes);
  
    return (
        <>
            <DndProvider backend={HTML5Backend}>
                {/* <AutoIndicator /> 
            
            */
                    //TODO handleCreatorAdd przekazuje nowy timebox                
                }

                <TimeboxCreator onAdd={onAdd} />

                {loadingError ? <ErrorMessage error={loadingError} /> : ""}
                {isLoading ? <AutoIndicator refresh="10" /> : ""}                
                <Timebox timebox={currentTimebox}/> 

                <TimeboxList timeboxes={timeboxes}>
                    {timeboxes?.map((elem, index) => {
                        return (
                            <TimeboxListElement
                                key={elem.uid}
                                timebox={elem}
                                onSave={handleSaveTimeboxListElement/*ki3 onSave inaczej wygląda i onDelete inaczej, jak to uogólnićm z kąd wiedzieć co pisać ?
                                                                    a może powinienem przez event dawać ?*/}
                                onDelete={() => { handleConfirmDeletion(elem.uid) }}
                                onStart={() => { onStartTimeboxListElement(index) }}
                                onMoveElement={handleMoveListElement}
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
                                onAction={() => { handleDeleteTimeboxListElement(timeboxToDelete.uid) }}
                                onCancel={handleCancelConfirmDeletion} />
                        </ModalComponent>
                    </Portal> : ""}
            </DndProvider>
        </>

    )
}

export default Pomodoro;