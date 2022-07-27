import { useAuthenticationContext } from "./useAuthenticationContext";
import { useTimeboxAPI } from "./useTimeboxAPI";
import { useCallback, useEffect, useState } from 'react';


function useManagedList(elements,setElements) {
    console.log('useManagedList')
    const { accessToken: apiAccessToken } = useAuthenticationContext();
    const [isLoading, setIsLoding] = useState(true);
    const [loadingError, setLoadingError] = useState(null);

      
    // const TimeboxAPI = useTimeboxAPI();
    const [TimeboxAPI] = useTimeboxAPI();
    
    useEffect(() => {
        //ki3 - czy tutaj dostęp do Api w zasadzie taki singleton troszkę
        //którego nie da się zamocować przy testach, czy nie powinien być 
        //przekazywany z zewnątrz ?
        TimeboxAPI.getAllTimeboxes(apiAccessToken)
            .then((fetchedElements) => { setElements(fetchedElements);console.log('setElements') })
            .catch((error) => setLoadingError(error))
            .finally(() => setIsLoding(false));
    }, [apiAccessToken, TimeboxAPI,setElements]); //ki3 po przejściu na hooka wymusza mi tutaj dodanie TimeboxAPI, czy to naprawde musi być?

    
    

    function handleDeleteListElement(uid) {        
        TimeboxAPI.removeTimebox(apiAccessToken, uid).then(() => {
            setElements(
                (prevTimeboxes) => {                    
                    return prevTimeboxes.filter((value, index) => value.uid === uid ? false : true);;
                }
            )
        }
        );
    }

    function handleSaveListElement(editedElement) {
        //const { element } = findElement(editedTimebox.uid);        
        TimeboxAPI.replaceTimebox(apiAccessToken, { ...editedElement }).then(
            () => {
                setElements(
                    (prevElements) => {
                        return prevElements.map((value) => { //TODOa1 tego mapa spróbować zedytować według uwag z konsultacji
                            return value.uid === editedElement.uid ? { ...editedElement } : value
                        })
                    }
                )
            }
        )
    }
    
    function handleCreatorAdd(timeboxToAdd) {
        
        TimeboxAPI.addTimebox(apiAccessToken, { ...timeboxToAdd }).then(() => {
            setElements(
                (prevTimeboxes) => {
                    return [timeboxToAdd, ...prevTimeboxes];
                }
            )
        });
    }

    const [currentIndex, setCurrentIndex] = useState(0); 
    
    function handleStartListElement(id) {
        setCurrentIndex(id);
        //TODOa1 refactor w/w handlerów z (id) na findElement z hooka useDND ? 
        //findElement do czegoś wspólnego przenieść ?
    }

    return [ 
        isLoading,
        loadingError,      
        elements.length > 0 ? elements[currentIndex] : null,
        handleCreatorAdd,
        handleDeleteListElement,
        handleSaveListElement,
        handleStartListElement
    ]
};


export { useManagedList };