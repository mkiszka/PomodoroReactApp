import { type } from "@testing-library/user-event/dist/type";
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
export const setError = error => {
    const message = `${error.name}-${error.code}-${error.message}`
    return { type: MANGEDLIST_ACTION.LOADING_ERROR_SET, loadingError: message };
}

export const setLoadingStatusFalse = () => ({ type: MANGEDLIST_ACTION.LOADING_STATUS_FALSE });
export const setLoadingStatusTrue = () => ({ type: MANGEDLIST_ACTION.LOADING_STATUS_TRUE });
export const removeElement = (removedElement) => ({ type: MANGEDLIST_ACTION.ELEMENT_REMOVE, element: removedElement });
export const replaceElement = (replacedElement) => ({ type: MANGEDLIST_ACTION.ELEMENT_REPLACE, element: replacedElement });
export const startCountdownElement = (element) => ({ type: MANGEDLIST_ACTION.CURRENT_COUNTDOWN_ELEMENT_SET, element });
export const moveElement = (uid, atUid) => ({ type: MANGEDLIST_ACTION.ELEMENT_MOVE, uid, atUid });
export const setElements = (elements) => ({ type: MANGEDLIST_ACTION.ELEMENTS_SET, elements });
export const addElement = (element) => ({ type: MANGEDLIST_ACTION.ELEMENT_ADD, element });


export const addElementToApi = (managedListAPI, apiAccessToken, elementToAdd) => (dispatch) => {
    elementToAdd.userId = getUserId(apiAccessToken);
    managedListAPI.addElement(apiAccessToken, { ...elementToAdd }).then((elementAdded) => {
        debugger;
        dispatch(addElement(elementAdded));
    });
}
export const getAllElements = (managedListAPI, apiAccessToken) => (dispatch) => {
    managedListAPI.getAllElements(apiAccessToken)
        .then((fetchedElements) => {
            dispatch(setElements(fetchedElements));
        })
        .catch((error) => dispatch(setError(error)))
        .finally(() => dispatch(setLoadingStatusFalse()));
}
export const deleteElementFromApi = (managedListAPI, apiAccessToken, toRemoveElement) => (dispatch) => {
    managedListAPI.removeElement(apiAccessToken, toRemoveElement).then(() => {
        dispatch(removeElement(toRemoveElement))
    }
    );
}
export const saveElementFromApi = (managedListAPI, apiAccessToken, editedElement, callback) => (dispatch) => {
    editedElement.userId = getUserId(apiAccessToken);
    const promise = managedListAPI.replaceElement(apiAccessToken, { ...editedElement });
    promise.then(
        (replacedElement) => {
            dispatch(replaceElement(replacedElement));
            if( callback !== 'undefined') {
                callback();
            }
        }
    )
    return promise;
}