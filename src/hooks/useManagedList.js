import { useCallback, useEffect, useState } from 'react';
import { getUserId } from "../utilities/accessToken";

export const MANGEDLIST_ACTION = {
    ELEMENTS_SET: 'ELEMENTS_SET',
    ELEMENT_REMOVE: 'ELEMENT_REMOVE'
};


function useManagedList(elements, setElements, apiAccessToken, elementAPI, dispatch) {
    console.log('useManagedList')


    const [isLoading, setIsLoding] = useState(true);
    const [loadingError, setLoadingError] = useState(null);


    // const TimeboxAPI = useTimeboxAPI();
    //const [TimeboxAPI] = useTimeboxAPI();

    useEffect(() => {
        elementAPI.getAllElements(apiAccessToken)
            .then((fetchedElements) => {
                //r: setElements(fetchedElements);
                dispatch({ type: MANGEDLIST_ACTION.ELEMENTS_SET, elements: fetchedElements });
            })
            .catch((error) => setLoadingError(error))
            .finally(() => setIsLoding(false));
    }, [apiAccessToken,elementAPI,dispatch]);

    const handleDeleteListElement = useCallback((deletedElement) => {

        elementAPI.removeElement(apiAccessToken, deletedElement).then(() => {
            dispatch({ type: MANGEDLIST_ACTION.ELEMENT_REMOVE, element: deletedElement})         
        }
        );
    },
        [apiAccessToken, elementAPI, dispatch]);

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
        const index = elements.findIndex((felement) => felement.uid === element.uid)
        setCurrentIndex(index);
        //TODOa1 refactor w/w handlerów z (id) na findElement z hooka useDND ? 
        //findElement do czegoś wspólnego przenieść ?
    }, [setCurrentIndex, elements]);

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