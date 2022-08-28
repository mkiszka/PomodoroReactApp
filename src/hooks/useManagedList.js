import { useAuthenticationContext } from "./useAuthenticationContext";
import { useCallback, useEffect, useState } from 'react';
import { getUserId } from "../utilities/accessToken";


function useManagedList(elements, setElements, elementAPI) {
    console.log('useManagedList')
    const { accessToken: apiAccessToken } = useAuthenticationContext();
    const [isLoading, setIsLoding] = useState(true);
    const [loadingError, setLoadingError] = useState(null);


    // const TimeboxAPI = useTimeboxAPI();
    //const [TimeboxAPI] = useTimeboxAPI();

    useEffect(() => {
        //ki3 - czy tutaj dostęp do Api w zasadzie taki singleton troszkę
        //którego nie da się zamocować przy testach, czy nie powinien być 
        //przekazywany z zewnątrz ?
        elementAPI.getAllElements(apiAccessToken)
            .then((fetchedElements) => {
                setElements(fetchedElements);
            })
            .catch((error) => setLoadingError(error))
            .finally(() => setIsLoding(false));
    }, [apiAccessToken, elementAPI, setElements]); //ki3 po przejściu na hooka wymusza mi tutaj dodanie TimeboxAPI, czy to naprawde musi być?    

    const handleDeleteListElement = useCallback((deletedElement) => {

        elementAPI.removeElement(apiAccessToken, deletedElement).then(() => {
            setElements(
                (prevTimeboxes) => {
                    return prevTimeboxes.filter((value, index) => value.uid === deletedElement.uid ? false : true);;
                }
            )
        }
        );
    },
        [apiAccessToken, elementAPI, setElements]);

    const handleSaveListElement = useCallback((editedElement) => {
        editedElement.userId = getUserId(apiAccessToken);
        const promise = elementAPI.replaceElement(apiAccessToken, { ...editedElement });
        promise.then(
            (replacedElement) => {
                setElements(
                    (prevElements) => {

                        return prevElements.map((value) => { //TODOa1 tego mapa spróbować zedytować według uwag z konsultacji
                            return value.uid === editedElement.uid ? { ...editedElement } : value
                        })
                    }
                )
            }
        )
        return promise;
    }, [apiAccessToken, elementAPI, setElements]);

    const handleCreatorAdd = useCallback((timeboxToAdd) => {
        timeboxToAdd.userId = getUserId(apiAccessToken);
        elementAPI.addElement(apiAccessToken, { ...timeboxToAdd }).then((timeboxAdded) => {
            setElements(
                (prevTimeboxes) => {
                    return [...prevTimeboxes, timeboxAdded];
                }
            )
        });
    },
        [apiAccessToken, elementAPI, setElements]);

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleStartListElement = useCallback((element) => {
        debugger;
        const index = elements.findIndex((felement) => felement.uid === element.uid )
        setCurrentIndex(index);
        //TODOa1 refactor w/w handlerów z (id) na findElement z hooka useDND ? 
        //findElement do czegoś wspólnego przenieść ?
    }, [setCurrentIndex,elements]);

    return {
        isLoading,
        loadingError,
        elements: ((elements.length > 0) ? elements[currentIndex] : null),
        handleCreatorAdd,
        handleDeleteListElement,
        handleSaveListElement,
        handleStartListElement
    }
};


export { useManagedList };