import { useCallback, useEffect, useState } from 'react';
import { instanceOf } from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { withCookies, Cookies } from 'react-cookie';
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

// function initialTimeboxes(cookies) {
//     return cookies.get('timeboxes') ||
//         [
//             { uid: uuidv4(), title: "Wywołanie eventów", totalTimeInMinutes: 3, isEditable: false },
//             { uid: uuidv4(), title: "KP-3034 Migracja z ver 1.14 do 1.15 usuwa powiązanie pacjent pracownik.", totalTimeInMinutes: 20, isEditable: false },
//             { uid: uuidv4(), title: "KP-3104 Deploy webserwisu zamówień dla 1.15", totalTimeInMinutes: 20, isEditable: false },
//         ];
// }
function wait(ms) {
    return new Promise((resolve) => { setTimeout(() => resolve(), ms) });
}
//dodanie funkcji symulującej pobieranie danych z serwera
//TimeboxesApi (symulowanie oóznienia)
// pobieranie z api
// dodawanie do api
// podmianka przy aktualizacji
//zadania

const TimeboxAPI = {
    getAllTimeboxes: async function () {
        await wait(3000);
        return [
            { uid: uuidv4(), title: "Wywołanie eventów", totalTimeInMinutes: 3, isEditable: false },
            { uid: uuidv4(), title: "KP-3034 Migracja z ver 1.14 do 1.15 usuwa powiązanie pacjent pracownik.", totalTimeInMinutes: 20, isEditable: false },
            { uid: uuidv4(), title: "KP-3104 Deploy webserwisu zamówień dla 1.15", totalTimeInMinutes: 20, isEditable: false },
        ];
    },
    addTimebox: async function (timeboxToAdd) {
        await wait(3000);
    },
    replaceTimebox: async function (timeboxToReplace) {
        await wait(3000);
    },
    removeTimebox: async function (timeboxToRemove) {
        await wait(3000);
        //timeboxes.splice
    }
};

function Pomodoro({ cookies }) {
    //initialTimeboxes(cookies)
    const [timeboxes, setTimeboxes] = useState([]);
    useEffect(() => {
        TimeboxAPI.getAllTimeboxes()
            .then((timeboxes) => setTimeboxes(timeboxes))
            .catch((error) => setLoadingError(error))
            .finally(() => setIsLoding(false));
    }, []);

    const [title, setTitle] = useState("Ucze się tego i tamtego?");
    const [totalTimeInMinutes, setTotalTimeInMinutes] = useState(25);
    const [isEditable/*, setIsEditable*/] = useState(true);
    const [timeboxes_currentIndex, setTimeboxes_currentIndex] = useState(0);
    const [isLoading, setIsLoding] = useState(true);
    const [loadingError, setLoadingError] = useState(null);

    function handleDeleteTimeboxListElement(uid) {
        setTimeboxes(
            (prevTimeboxes) => {
                let timeboxes = prevTimeboxes.filter((value, index) => value.uid === uid ? false : true);
                cookies.set('timeboxes', timeboxes, { path: '/' });
                return timeboxes;
            }
        )
    }

    function handleTitleCreatorChange(event) {
        setTitle(event.target.value);
    }

    function handleTotalTimeInMinutesCreatorChange(event) {
        setTotalTimeInMinutes(event.target.value);
    }
    function handleCreatorAdd(timeboxToAdd) {
        setTimeboxes(
            (prevTimeboxes) => {
                let timeboxes = prevTimeboxes;
                timeboxes = [...prevTimeboxes, timeboxToAdd];
                cookies.set('timeboxes', timeboxes, { path: '/' });
                return timeboxes;
            }
        )
    }

    function handleEditTimeboxListElement(uid) {

        setTimeboxes(
            (prevTimeboxes) => {
                return prevTimeboxes.map((value) => {
                    return value.uid === uid ? { ...value, isEditable: !value.isEditable } : value
                })
            }
        )
    }

    function handleTitleElementChange(event, id) {
        setTimeboxes(
            (prevTimeboxes) =>
                prevTimeboxes.map(
                    (act_timebox, act_id) => { return act_id === id ? { ...act_timebox, title: event.target.value } : act_timebox }
                )
        );
    }

    function handleTimeElementChange(event, id) {
        timeboxes[id].totalTimeInMinutes = event.target.value;

        setTimeboxes(
            (prevTimeboxes) =>
                prevTimeboxes.map(
                    (act_timebox, act_id) => { return act_id === id ? { ...act_timebox, totalTimeInMinutes: event.target.value } : act_timebox }
                )
        );
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

    const moveElement = useCallback(
        (uid, atIndex) => {

            const { element, index } = findElement(uid)
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
    const AutoIndicator = withAutoIndicator(ProgressBar); //TODO - fix the refresh bug

    const [, drop] = useDrop(() => ({ accept: DraggableItemTypes.TimeboxListElement }))
    console.log("🚀 ~ file: Pomodoro.js ~ line 159 ~ Pomodoro ~ isLoading", isLoading)
    return (
        <>
            {/* <AutoIndicator /> */}
            <TimeboxCreator title={title}
                totalTimeInMinutes={totalTimeInMinutes}
                onTitleChange={handleTitleCreatorChange}
                onTotalTimeInMinutesChange={handleTotalTimeInMinutesCreatorChange}
                onAdd={handleCreatorAdd}
                isEditable={isEditable} />
            {loadingError ? <ErrorMessage error={loadingError} /> : ""}
            {isLoading ? <AutoIndicator refresh="10"/> : ""}
            {timeboxes.length > 0 ? <Timebox
                timebox={timeboxes.length > 0 ? timeboxes[timeboxes_currentIndex] : {}}
                isEditable={true}
            /> : ""}

            <TimeboxList timeboxes={timeboxes} ref={drop}>
                {timeboxes?.map((elem, index) => {
                    return (
                        <TimeboxListElement
                            key={elem.uid}
                            uid={elem.uid}/* change index to uid and then refactor handleStartTimeboxListElement */
                            timebox={elem}
                            onTitleChange={handleTitleElementChange}
                            onTimeChange={handleTimeElementChange}
                            onEdit={() => { handleEditTimeboxListElement(elem.uid) }}
                            onDelete={() => { handleDeleteTimeboxListElement(elem.uid) }}
                            onStart={() => { handleStartTimeboxListElement(index) }}
                            moveElement={moveElement}
                            findElement={findElement}
                        />
                    );
                })
                }
            </TimeboxList>
        </>

    )
}
Pomodoro.propTypes = {
    cookies: instanceOf(Cookies).isRequired
}
export default withCookies(Pomodoro);