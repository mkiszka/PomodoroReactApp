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


function useManagedList(apiAccessToken, elementAPI, dispatch) {
    console.log('useManagedList')
  
    useEffect(() => {
        dispatch({ type: MANGEDLIST_ACTION.LOADING_STATUS_TRUE });
        elementAPI.getAllElements(apiAccessToken)
            .then((fetchedElements) => {
                dispatch({ type: MANGEDLIST_ACTION.ELEMENTS_SET, elements: fetchedElements });
            })
            .catch((error) => dispatch({ type: MANGEDLIST_ACTION.LOADING_ERROR_SET, loadingError: error }))
            .finally(() => dispatch({ type: MANGEDLIST_ACTION.LOADING_STATUS_FALSE }) );
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

    const handleStartListElement = useCallback((element) => {
        //debugger;
        dispatch({ type: MANGEDLIST_ACTION.CURRENT_COUNTDOWN_ELEMENT_SET, element });
    }, [dispatch]);


    const handleMoveElement = useCallback(
        (uid, atUid) => {
            dispatch({ type: MANGEDLIST_ACTION.ELEMENT_MOVE, uid, atUid })
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