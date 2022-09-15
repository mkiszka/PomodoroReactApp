import { useCallback, useEffect } from 'react';
import { addElementToApi, deleteElementAPI, requestAllElements, moveElement, saveElementAPI, setLoadingStatusTrue, startCountdownElement } from '../redux/managedListActions';

function useManagedList(apiAccessToken, elementAPI, dispatch) {
    console.log('useManagedList')

    useEffect(() => {
        dispatch(setLoadingStatusTrue());
        dispatch(requestAllElements())

    }, [apiAccessToken, elementAPI, dispatch]);

    const handleDeleteListElement = useCallback((toRemoveElement) => {
        dispatch(deleteElementAPI(toRemoveElement));
    }, [dispatch]);

    const handleSaveListElement = useCallback((editedElement) => {
        dispatch(saveElementAPI(editedElement));
    }, [dispatch]);

    const handleAddListElement = useCallback((elementToAdd) => {
        dispatch(addElementToApi(elementToAdd));
    }, [dispatch]);

    const handleStartListElement = useCallback((element) => {
        dispatch(startCountdownElement(element));
    }, [dispatch]);


    const handleMoveElement = useCallback(
        (uid, atUid) => {
            dispatch(moveElement(uid, atUid));         
        },
        [dispatch],
    )



    return {
        handleAddListElement,
        handleDeleteListElement,
        handleSaveListElement,
        handleStartListElement,
        handleMoveElement
    }
};


export { useManagedList };