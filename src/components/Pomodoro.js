import { useCallback, useEffect, useState, useContext } from 'react';
import update from 'immutability-helper';
import Timebox from "./Timebox";
import TimeboxList from "./TimeboxList";
import TimeboxListElement from "./TimeboxListElement";
import TimeboxCreator from "./TimeboxCreator";
import ErrorMessage from "./ErrorMessage";
import withAutoIndicator from "./AutoIndicator";
import ProgressBar from './ProgressBar';
import { TimeboxFakeAPI as TimeboxAPI } from '../api/TimeboxFakeAPI';
import AuthenticationContext from '../contexts/AuthenticationContext';
import Portal from './Portal';
import ModalComponent from './ModalComponent';
import ButtonMessage from './ButtonMessage';

const AutoIndicator = withAutoIndicator(ProgressBar);
function Pomodoro() {
    const authenticationContext = useContext(AuthenticationContext);
    const [timeboxes, setTimeboxes] = useState([]);
    useEffect(() => {
        //vip3 
        TimeboxAPI.getAllTimeboxes(authenticationContext.accessToken)
            .then((timeboxes) => { setTimeboxes(timeboxes) })
            .catch((error) => setLoadingError(error))
            .finally(() => setIsLoding(false));
    }, [authenticationContext.accessToken]);

    const [title, setTitle] = useState("Ucze się tego i tamtego?");
    const [totalTimeInMinutes, setTotalTimeInMinutes] = useState(25);
    const [timeboxes_currentIndex, setTimeboxes_currentIndex] = useState(0);
    const [isLoading, setIsLoding] = useState(true);
    const [loadingError, setLoadingError] = useState(null);
    //vip3 - 
    //1. poprawność tworzenia zapytania z portlem,
    //czy jako zmienna stanowa i wyświetlanie bądź nie ?
    //2. przekazywanie tekstu do wyświetlenia ?
    const [timeboxToDelete, setTimeboxToDelete] = useState(null);    
    function handleConfirmDeletion(uid) {        
        setTimeboxToDelete(findElement(uid).element); 
    }

    function handleDeleteTimeboxListElement(uid) {        
        setTimeboxToDelete(null);
        TimeboxAPI.removeTimebox(authenticationContext.accessToken, uid).then(() => {
            setTimeboxes(
                (prevTimeboxes) => {
                    let timeboxes = prevTimeboxes.filter((value, index) => value.uid === uid ? false : true);
                    return timeboxes;
                }
            )
        }
        );
    }
    function handleCancelConfirmDeletion() {
        setTimeboxToDelete(null);
    }

    //TODO customhook to co dotyka tablicy timeboxów (nagranie vip2 końcówka)
    function handleTitleCreatorChange(event) {
        setTitle(event.target.value);
    }
    function handleTotalTimeInMinutesCreatorChange(event) {
        setTotalTimeInMinutes(event.target.value);
    }
    function handleCreatorAdd(timeboxToAdd) {
        TimeboxAPI.addTimebox(authenticationContext.accessToken, { ...timeboxToAdd }).then(() => {
            setTimeboxes(
                (prevTimeboxes) => {
                    return [timeboxToAdd, ...prevTimeboxes];
                }
            )
        });
    }
    function handleSaveTimeboxListElement(editedTimebox) {
        //const { element } = findElement(editedTimebox.uid);        
        TimeboxAPI.replaceTimebox(authenticationContext.accessToken, { ...editedTimebox }).then(
            () => {
                setTimeboxes(
                    (prevTimeboxes) => {
                        return prevTimeboxes.map((value) => { //TODOa1 tego mapa spróbować zedytować według uwag z konsultacji
                            return value.uid === editedTimebox.uid ? { ...editedTimebox } : value
                        })
                    }
                )
            }
        )
    }
    function handleStartTimeboxListElement(id) {
        setTimeboxes_currentIndex(id);
        //TODOa1 refactor w/w handlerów z (id) na findElement
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

    return (
        <>
            {/* <AutoIndicator /> 
            
            */
                //TODO handleCreatorAdd przekazuje nowy timebox                
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

            <TimeboxList timeboxes={timeboxes}>
                {timeboxes?.map((elem, index) => {
                    return (
                        <TimeboxListElement
                            key={elem.uid}
                            timebox={elem}
                            onSave={handleSaveTimeboxListElement/*vip3 onSave inaczej wygląda i onDelete inaczej, jak to uogólnićm z kąd wiedzieć co pisać ?
                                                                    a może powinienem przez event dawać ?*/}
                            onDelete={() => { handleConfirmDeletion(elem.uid) }}
                            onStart={() => { handleStartTimeboxListElement(index) }}
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
        </>

    )
}

export default Pomodoro;