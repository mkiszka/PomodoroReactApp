import { useAuthenticationContext } from "./useAuthenticationContext";
import { useTimeboxAPI } from "./useTimeboxAPI";
import { useCallback, useEffect, useState } from 'react';
import update from 'immutability-helper';

function useTimeboxes() {
    console.log('useTimeboxes')
    const { accessToken } = useAuthenticationContext();
    const [isLoading, setIsLoding] = useState(true);
    const [loadingError, setLoadingError] = useState(null);

    const [timeboxes, setTimeboxes] = useState([]);    
    // const TimeboxAPI = useTimeboxAPI();
    const [TimeboxAPI] = useTimeboxAPI();
    
    useEffect(() => {
        //ki3 - czy tutaj dostęp do Api w zasadzie taki singleton troszkę
        //którego nie da się zamocować przy testach, czy nie powinien być 
        //przekazywany z zewnątrz ?
        TimeboxAPI.getAllTimeboxes(accessToken)
            .then((timeboxes) => { setTimeboxes(timeboxes);console.log('setTimeboxes') })
            .catch((error) => setLoadingError(error))
            .finally(() => setIsLoding(false));
    }, [accessToken, TimeboxAPI,setTimeboxes]); //ki3 po przejściu na hooka wymusza mi tutaj dodanie TimeboxAPI, czy to naprawde musi być?

    
    

    function handleDeleteTimeboxListElement(uid) {
        //setTimeboxToDelete(null);
        TimeboxAPI.removeTimebox(accessToken, uid).then(() => {
            setTimeboxes(
                (prevTimeboxes) => {
                    let timeboxes = prevTimeboxes.filter((value, index) => value.uid === uid ? false : true);
                    return timeboxes;
                }
            )
        }
        );
    }

    function handleSaveTimeboxListElement(editedTimebox) {
        //const { element } = findElement(editedTimebox.uid);        
        TimeboxAPI.replaceTimebox(accessToken, { ...editedTimebox }).then(
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
    
    const [timeboxes_currentIndex, setTimeboxes_currentIndex] = useState(0); 
    
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


    return [ timeboxes,         
        setTimeboxes, 
        timeboxes.length > 0 ? timeboxes[timeboxes_currentIndex] : null,
        handleDeleteTimeboxListElement,
        handleSaveTimeboxListElement,
        handleStartTimeboxListElement,
        findElement,
        handleMoveElement,
        isLoading,
        loadingError

    ]
};


export { useTimeboxes };