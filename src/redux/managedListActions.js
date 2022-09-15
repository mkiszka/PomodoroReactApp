import { getUserId } from "../utilities/accessToken";
import { getAccessToken } from "./authentificationActions";
import { getAllElements } from "./managedListReducer";
import { TIMEBOXLISTELEMENT_STATE } from "./TIMEBOXLISTELEMENT_STATE";
import { setUIState } from "./uiElementStateReducer";

export const MANGEDLIST_ACTION = {
    ELEMENTS_SET: 'ELEMENTS_SET',
    ELEMENT_REMOVE: 'ELEMENT_REMOVE',
    ELEMENT_ADD: 'ELEMENT_ADD',
    ELEMENT_REPLACE: 'EMENT_REPLACE',
    ELEMENT_MOVE: 'ELEMENT_MOVE',
    CURRENT_COUNTDOWN_ELEMENT_SET: 'CURRENT_COUNTDOWN_ELEMENT_SET',
    LOADING_STATUS_TRUE: 'LOADING_STATUS_TRUE',
    LOADING_STATUS_FALSE: 'LOADING_STATUS_FALSE',
    LOADING_ERROR_SET: 'LOADING_ERROR_SET',
    REMEBER_ORDER: 'managedList/remeber_order'
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
export const rememberOrder = () => ({ type: MANGEDLIST_ACTION.REMEBER_ORDER });

export const addElementToApi = (elementToAdd) => (dispatch, getState,{ managedListAPI }) => {
    const accessToken = getAccessToken(getState())
    elementToAdd.userId = getUserId(accessToken);
    managedListAPI.addElement(accessToken, { ...elementToAdd }).then((elementAdded) => {    
        dispatch(addElement(elementAdded));
    });
}
export const requestAllElements = () => (dispatch, getState,{ managedListAPI }) => {
    const accessToken = getAccessToken(getState())
    managedListAPI.getAllElements(accessToken)
        .then((fetchedElements) => {
            dispatch(setElements(fetchedElements));
        })
        .catch((error) => dispatch(setError(error)))
        .finally(() => dispatch(setLoadingStatusFalse()));
}
export const deleteElementAPI = (toRemoveElement) => (dispatch, getState,{ managedListAPI }) => {
    const accessToken = getAccessToken(getState());  
    managedListAPI.removeElement(accessToken, toRemoveElement).then(() => {
        dispatch(removeElement(toRemoveElement))
    }
    );
}
export const saveElementAPI = (editedElement) => (dispatch, getState,{ managedListAPI }) => {        
    const accessToken = getAccessToken(getState());     
    editedElement.userId = getUserId(accessToken);

    dispatch(setUIState({ id:editedElement.uid, uiState: TIMEBOXLISTELEMENT_STATE.FROZEN}));
    const promise = managedListAPI.replaceElement(accessToken, { ...editedElement });
    promise.then(
        (replacedElement) => {
            
            dispatch(replaceElement(replacedElement));
            dispatch(setUIState({id: editedElement.uid,uiState: TIMEBOXLISTELEMENT_STATE.NONEDITABLE})) //ki5 - czy mogę z reduxa odpalać zmianę stanu komponentów?
        }          
    )  
}

export const updateElementsOrderToApi = () => (dispatch, getState,{ managedListAPI }) => {
    const state = getState(); 
    const elements =  getAllElements(state);
    
    elements.forEach((element) => {
        //old order is set in reducer (MANGEDLIST_ACTION.ELEMENT_MOVE) 
        const oldOrder = element.oldOrder;
        delete element.oldOrder;
        if( oldOrder !== element.order) {
           dispatch(saveElementAPI(element));
        }
    })
}