import { useCallback, useEffect } from 'react';
import { addElementToApi, deleteElementAPI, getAllElements, moveElement, saveElementAPI, setLoadingStatusTrue, startCountdownElement } from '../redux/managedListActions';

function useManagedList(apiAccessToken, elementAPI, dispatch) {
    console.log('useManagedList')

    useEffect(() => {
        dispatch(setLoadingStatusTrue());
        dispatch(getAllElements())

    }, [apiAccessToken, elementAPI, dispatch]);

    const handleDeleteListElement = useCallback((toRemoveElement) => {
        dispatch(deleteElementAPI(toRemoveElement));
    }, [dispatch]);

    const handleSaveListElement = useCallback((editedElement, callback) => {
        dispatch(saveElementAPI(editedElement, callback));
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