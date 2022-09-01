
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
export const setError = error => ({ type: MANGEDLIST_ACTION.LOADING_ERROR_SET, loadingError: error });
export const setLoadingStatusFalse = () => ({ type: MANGEDLIST_ACTION.LOADING_STATUS_FALSE });
export const setLoadingStatusTrue = () => ({ type: MANGEDLIST_ACTION.LOADING_STATUS_TRUE });
export const removeElement = (removedElement) => ({ type: MANGEDLIST_ACTION.ELEMENT_REMOVE, element: removedElement });      
export const replaceElement = (replacedElement) => ({ type: MANGEDLIST_ACTION.ELEMENT_REPLACE, element: replacedElement });
export const startCountdownElement = (element) => ({ type: MANGEDLIST_ACTION.CURRENT_COUNTDOWN_ELEMENT_SET, element });
export const moveElement = (uid, atUid) => ({ type: MANGEDLIST_ACTION.ELEMENT_MOVE, uid, atUid });
export const setElements = (elements) => ({ type: MANGEDLIST_ACTION.ELEMENTS_SET, elements });
export const addElement = (element) => ({ type: MANGEDLIST_ACTION.ELEMENT_ADD, element });