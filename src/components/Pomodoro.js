import { useEffect, useState } from 'react';
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
import { useAuthenticationContext } from '../hooks/useAuthenticationContext';
import { useTimeboxCreator } from '../hooks/useTimeboxCreator';
import { useTimeboxAPI } from '../hooks/useTimeboxAPI';
import { useTimeboxes } from '../hooks/useTimeboxes';

const AutoIndicator = withAutoIndicator(ProgressBar);
function Pomodoro() {
    
    const [
        timeboxes, setTimeboxes,
        currentTimebox,
        handleDeleteTimeboxListElement,
        handleSaveTimeboxListElement,
        onStartTimeboxListElement,
        findElement,
        handleMoveElement,
        isLoading,
        loadingError
    
    ] = useTimeboxes();
    // const TimeboxAPI= useTimeboxAPI();
   
    //ki3 - 
    //1. poprawność tworzenia zapytania z portlem,
    //czy jako zmienna stanowa i wyświetlanie bądź nie ?
    //2. przekazywanie tekstu do wyświetlenia ?
    const [timeboxToDelete, setTimeboxToDelete] = useState(null);
    function handleConfirmDeletion(uid) {
        setTimeboxToDelete(findElement(uid).element);
    }

    
    function handleCancelConfirmDeletion() {
        setTimeboxToDelete(null);
    }

    //TODO customhook to co dotyka tablicy timeboxów (nagranie ki2 końcówka)
       
    const [title,
        totalTimeInMinutes,
        onTitleChange,
        onTotalTimeInMinutesChange,
        onAdd        
        ] = useTimeboxCreator(setTimeboxes);
        console.log('render')
    return (
        <>
            <DndProvider backend={HTML5Backend}>
                {/* <AutoIndicator /> 
            
            */
                    //TODO handleCreatorAdd przekazuje nowy timebox                
                }

                <TimeboxCreator title={title}
                    totalTimeInMinutes={totalTimeInMinutes}
                    onTitleChange={onTitleChange}
                    onTotalTimeInMinutesChange={onTotalTimeInMinutesChange}
                    onAdd={onAdd}
                />
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
                                onMoveElement={handleMoveElement}
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