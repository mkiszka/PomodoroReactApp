// FILE IS NOT USED  ?

import { useAuthenticationContext } from "./useAuthenticationContext";
import { useTimeboxAPI } from "./useTimeboxAPI";
import { useCallback, useEffect, useState } from 'react';
import update from 'immutability-helper';

function useTimeboxes(ListAPI,) {
    console.log('useTimeboxes')
    const { accessToken } = useAuthenticationContext();
    const [isLoading, setIsLoding] = useState(true);
    const [loadingError, setLoadingError] = useState(null);

    const [timeboxes, setTimeboxes] = useState([]);    
    
    const [
        removeElementAPI,
        getAllElementsAPI,
        replaceElementAPI
    ] = useTimeboxAPI();
    
    useEffect(() => {        
        getAllElementsAPI(accessToken)
            .then((timeboxes) => { setTimeboxes(timeboxes);console.log('setTimeboxes') })
            .catch((error) => setLoadingError(error))
            .finally(() => setIsLoding(false));
    }, [accessToken,setTimeboxes,getAllElementsAPI]); //ki3 po przejściu na hooka wymusza mi tutaj dodanie TimeboxAPI, czy to naprawde musi być?

    
    

    function handleDeleteTimeboxListElement(uid) {    
        removeElementAPI(accessToken, uid).then(() => {
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
        
        replaceElementAPI(accessToken, { ...editedTimebox }).then(
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
    const handleMoveListElement = useCallback(
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


    return [ 
        isLoading,
        loadingError,
        timeboxes,         
        setTimeboxes, 
        timeboxes.length > 0 ? timeboxes[timeboxes_currentIndex] : null, //current timebox
        handleDeleteTimeboxListElement,
        handleSaveTimeboxListElement,
        handleStartTimeboxListElement,
        handleMoveListElement,
        findElement,
    ]
};


export { useTimeboxes };