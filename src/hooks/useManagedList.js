import { useCallback, useEffect, useState } from 'react';
import { getUserId } from "../utilities/accessToken";

export const MANGEDLIST_ACTION = {
    ELEMENTS_SET: 'ELEMENTS_SET',
    ELEMENT_REMOVE: 'ELEMENT_REMOVE',
    ELEMENT_ADD: 'ELEMENT_ADD',
    ELEMENT_REPLACE: 'EMENT_REPLACE',
    ELEMENT_MOVE: 'ELEMENT_MOVE',
    CURRENT_COUNTDOWN_ELEMENT_SET: 'CURRENT_COUNTDOWN_ELEMENT_SET',
    LOADING_STATUS_TRUE: 'LOADING_STATUS_TRUE',
    LOADING_STATUS_FALSE: 'LOADING_STATUS_FALSE',
    LOADING_ERROR_SET: 'LOADING_ERROR_SET'
};
//gneratory akcji
const setError = error => ({ type: MANGEDLIST_ACTION.LOADING_ERROR_SET, loadingError: error });
const setLoadingStatusFalse = () => ({ type: MANGEDLIST_ACTION.LOADING_STATUS_FALSE });
const setLoadingStatusTrue = () => ({ type: MANGEDLIST_ACTION.LOADING_STATUS_TRUE });
const removeElement = (removedElement) => ({ type: MANGEDLIST_ACTION.ELEMENT_REMOVE, element: removedElement });      
const replaceElement = (replacedElement) => ({ type: MANGEDLIST_ACTION.ELEMENT_REPLACE, element: replacedElement });
const startCountdownElement = (element) => ({ type: MANGEDLIST_ACTION.CURRENT_COUNTDOWN_ELEMENT_SET, element });
const moveElement = (uid, atUid) => ({ type: MANGEDLIST_ACTION.ELEMENT_MOVE, uid, atUid });

function useManagedList(apiAccessToken, elementAPI, dispatch) {
    console.log('useManagedList')
  
    useEffect(() => {
        dispatch(setLoadingStatusTrue());
        elementAPI.getAllElements(apiAccessToken)
            .then((fetchedElements) => {
                dispatch({ type: MANGEDLIST_ACTION.ELEMENTS_SET, elements: fetchedElements });
            })
            .catch((error) => dispatch(setError(error)))
            .finally(() => dispatch(setLoadingStatusFalse()) );
    }, [apiAccessToken, elementAPI, dispatch]);

    const handleDeleteListElement = useCallback((toRemoveElement) => {

        elementAPI.removeElement(apiAccessToken, toRemoveElement).then(() => {           
            dispatch(removeElement(toRemoveElement))
        }
        );
    },
        [apiAccessToken, elementAPI, dispatch]);

    const handleSaveListElement = useCallback((editedElement) => {
        editedElement.userId = getUserId(apiAccessToken);
        const promise = elementAPI.replaceElement(apiAccessToken, { ...editedElement });
        promise.then(
            (replacedElement) => {
                dispatch(replaceElement(replacedElement));
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
        handleCreatorAdd,
        handleDeleteListElement,
        handleSaveListElement,
        handleStartListElement,
        handleMoveElement
    }
};


export { useManagedList };