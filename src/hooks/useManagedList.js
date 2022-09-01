import { useCallback, useEffect } from 'react';
import { addElement, moveElement, removeElement, replaceElement, setElements, setError, setLoadingStatusFalse, setLoadingStatusTrue, startCountdownElement } from '../managedListActions';
import { getUserId } from "../utilities/accessToken";


function useManagedList(apiAccessToken, elementAPI, dispatch) {
    console.log('useManagedList')
  
    useEffect(() => {
        dispatch(setLoadingStatusTrue());
        elementAPI.getAllElements(apiAccessToken)
            .then((fetchedElements) => {
                dispatch(setElements(fetchedElements));
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
            dispatch(addElement(elementAdded));
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