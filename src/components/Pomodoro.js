import { useCallback, useEffect, useState } from 'react';

import { DraggableItemTypes } from "./DraggableItemTypes";
import { useDrop } from "react-dnd";

import update from 'immutability-helper';

import Timebox from "./Timebox";
import TimeboxList from "./TimeboxList";
import TimeboxListElement from "./TimeboxListElement";
import TimeboxCreator from "./TimeboxCreator";
import ErrorMessage from "./ErrorMessage";
import withAutoIndicator from "./AutoIndicator";
import ProgressBar from './ProgressBar';
import { TimeboxFakeAPI as TimeboxAPI } from '../api/TimeboxFakeAPI';

const AutoIndicator = withAutoIndicator(ProgressBar);

function Pomodoro() {

    const [timeboxes, setTimeboxes] = useState([]);
    useEffect(() => {

        TimeboxAPI.getAllTimeboxes()
            .then((timeboxes) => { setTimeboxes(timeboxes) })
            .catch((error) => setLoadingError(error))
            .finally(() => setIsLoding(false));
    }, []);

    const [title, setTitle] = useState("Ucze się tego i tamtego?");
    const [totalTimeInMinutes, setTotalTimeInMinutes] = useState(25);
    const [timeboxes_currentIndex, setTimeboxes_currentIndex] = useState(0);
    const [isLoading, setIsLoding] = useState(true);
    const [loadingError, setLoadingError] = useState(null);

    function handleDeleteTimeboxListElement(uid) {
        TimeboxAPI.removeTimebox(uid).then(() => {
            console.log("removeTimebox.then");
            setTimeboxes(
                (prevTimeboxes) => {
                    let timeboxes = prevTimeboxes.filter((value, index) => value.uid === uid ? false : true);
                    return timeboxes;
                }
            )
        }
        );
    }
    //TODO customhook to co dotyka tablicy timeboxów (nagranie vip2 końcówka)
    function handleTitleCreatorChange(event) {
        setTitle(event.target.value);
    }

    function handleTotalTimeInMinutesCreatorChange(event) {
        setTotalTimeInMinutes(event.target.value);
    }

    function handleCreatorAdd(timeboxToAdd) {
        TimeboxAPI.addTimebox({ ...timeboxToAdd }).then(() => {
            setTimeboxes(
                (prevTimeboxes) => {
                    return [timeboxToAdd, ...prevTimeboxes];
                }
            )
        });
    }

    //TODO nie wysyłać isEditable do backendu
    //iseditable przenieść do środka
    function handleSaveTimeboxListElement(editedTimebox) {
        //const { element } = findElement(editedTimebox.uid);        
        TimeboxAPI.replaceTimebox({ ...editedTimebox }).then(
            () => {
                setTimeboxes(
                    (prevTimeboxes) => {
                        return prevTimeboxes.map((value) => { //tego mapa spróbować zedytować według uwag z konsultacji
                            return value.uid === editedTimebox.uid ? { ...editedTimebox } : value
                        })
                    }
                )
            }
        )
    }



    function handleStartTimeboxListElement(id) {
        setTimeboxes_currentIndex(id);
        //refactor w/w handlerów z (id) na findElement
    }

    const findElement = useCallback(
        (uid) => {
            const element = timeboxes.filter(
                (element) => {
                    return `${element.uid}` === uid;
                }
            )[0]
            return {
                element,
                index: timeboxes.indexOf(element),
            }
        },
        [timeboxes],
    )

    const handleMoveElement = useCallback(
        (uid, atUid) => {

            const { element, index } = findElement(uid)
            const { /*element: atElement,*/ index: atIndex } = findElement(atUid)
            setTimeboxes(
                update(timeboxes, {
                    $splice: [
                        [index, 1],
                        [atIndex, 0, element],
                    ],
                }),
            )
        },
        [findElement, timeboxes],
    )


    const [, drop] = useDrop(() => ({ accept: DraggableItemTypes.TimeboxListElement })) //przenieść do TimeboxList i nie róbić refa
    console.log("🚀 ~ file: Pomodoro.js ~ line 182 ~ Pomodoro ~ isLoading", isLoading)
    return (
        <>
            {/* <AutoIndicator /> 
            
            */
                //przenieść onTitleChange and onTotalTimeInMinutesChanges przenieś  do środka i 
                //handleCreatorAdd przekazuje nowy timebox
                //usunięcie isEditable
            }
            <TimeboxCreator title={title}
                totalTimeInMinutes={totalTimeInMinutes}
                onTitleChange={handleTitleCreatorChange}
                onTotalTimeInMinutesChange={handleTotalTimeInMinutesCreatorChange}
                onAdd={handleCreatorAdd}
            />
            {loadingError ? <ErrorMessage error={loadingError} /> : ""}
            {isLoading ? <AutoIndicator refresh="10" /> : ""}
            {timeboxes.length > 0 ? <Timebox
                timebox={timeboxes.length > 0 ? timeboxes[timeboxes_currentIndex] : {}}
            /> : ""}

            <TimeboxList timeboxes={timeboxes} ref={drop}>
                {timeboxes?.map((elem, index) => {
                    return (
                        <TimeboxListElement
                            key={elem.uid}
                            timebox={elem}
                            onSave={handleSaveTimeboxListElement/*vip3 onSave inaczej wygląda i onDelete inaczej, jak to uogólnićm z kąd wiedzieć co pisać ?
                                                                    a może powinienem przez event dawać ?*/}
                            onDelete={() => { handleDeleteTimeboxListElement(elem.uid) }}
                            onStart={() => { handleStartTimeboxListElement(index) }}
                            onMoveElement={handleMoveElement}
                        />
                    );
                })
                }
            </TimeboxList>
        </>

    )
}

export default Pomodoro;