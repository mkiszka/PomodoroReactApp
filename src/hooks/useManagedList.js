import { useCallback, useEffect, useState } from 'react';
import { getUserId } from "../utilities/accessToken";

export const MANGEDLIST_ACTION = {
    ELEMENTS_SET: 'ELEMENTS_SET',
    ELEMENT_REMOVE: 'ELEMENT_REMOVE',
    ELEMENT_ADD: 'ELEMENT_ADD',
    ELEMENT_REPLACE: 'EMENT_REPLACE'
};


function useManagedList(elements, apiAccessToken, elementAPI, dispatch) {
    console.log('useManagedList')


    const [isLoading, setIsLoding] = useState(true);
    const [loadingError, setLoadingError] = useState(null);


    // const TimeboxAPI = useTimeboxAPI();
    //const [TimeboxAPI] = useTimeboxAPI();

    useEffect(() => {
        elementAPI.getAllElements(apiAccessToken)
            .then((fetchedElements) => {             
                dispatch({ type: MANGEDLIST_ACTION.ELEMENTS_SET, elements: fetchedElements });
            })
            .catch((error) => setLoadingError(error))
            .finally(() => setIsLoding(false));
    }, [apiAccessToken, elementAPI, dispatch]);

    const handleDeleteListElement = useCallback((deletedElement) => {

        elementAPI.removeElement(apiAccessToken, deletedElement).then(() => {
            dispatch({ type: MANGEDLIST_ACTION.ELEMENT_REMOVE, element: deletedElement })
        }
        );
    },
        [apiAccessToken, elementAPI, dispatch]);

    const handleSaveListElement = useCallback((editedElement) => {
        editedElement.userId = getUserId(apiAccessToken);
        const promise = elementAPI.replaceElement(apiAccessToken, { ...editedElement });
        promise.then(
            (replacedElement) => {
                dispatch({ type: MANGEDLIST_ACTION.ELEMENT_REPLACE, element: replacedElement })
            }
        )
        return promise;
    }, [apiAccessToken, elementAPI, dispatch]);

    const handleCreatorAdd = useCallback((elementToAdd) => {
        elementToAdd.userId = getUserId(apiAccessToken);
        elementAPI.addElement(apiAccessToken, { ...elementToAdd }).then((elementAdded) => {
            dispatch({ type: MANGEDLIST_ACTION.ELEMENT_ADD, element: elementAdded });
        });
    }, [apiAccessToken, elementAPI, dispatch]);

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