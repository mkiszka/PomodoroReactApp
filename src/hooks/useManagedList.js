import { useCallback, useEffect } from 'react';
import { addElementToApi, deleteElementFromApi, getAllElements, moveElement, saveElementFromApi, setLoadingStatusFalse, setLoadingStatusTrue, startCountdownElement } from '../redux/managedListActions';
import { getUserId } from "../utilities/accessToken";


function useManagedList(apiAccessToken, elementAPI, dispatch) {
    console.log('useManagedList')
  
    useEffect(() => {
        dispatch(setLoadingStatusTrue());
        dispatch(getAllElements(elementAPI,apiAccessToken))
       
    }, [apiAccessToken, elementAPI, dispatch]);

    const handleDeleteListElement = useCallback((toRemoveElement) => {
        dispatch(deleteElementFromApi(elementAPI,apiAccessToken,toRemoveElement));        
    }, [apiAccessToken, elementAPI, dispatch]);

    const handleSaveListElement = useCallback((editedElement) => {
        dispatch(saveElementFromApi(elementAPI,apiAccessToken,editedElement));
    }, [apiAccessToken, elementAPI, dispatch]);

    const handleAddListElement = useCallback((elementToAdd) => {
        dispatch(addElementToApi(elementAPI, apiAccessToken, elementToAdd));        
    }, [apiAccessToken, elementAPI, dispatch]);

    const handleStartListElement = useCallback((element) => {
        dispatch(startCountdownElement(element));
    }, [dispatch]);


    const handleMoveElement = useCallback(
        (uid, atUid) => {
            dispatch(moveElement(uid,atUid));
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