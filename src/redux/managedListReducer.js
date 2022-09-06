import update from 'immutability-helper';
import { MANGEDLIST_ACTION } from './managedListActions';

//TODO 
//w Timebox.js dowiedzieć się jak w redux używać setInterval

function findElement(elements, uid) {
    const element = elements.filter(
        (element) => {
            return `${element.uid}` === uid;
        }
    )[0]
    return {
        element,
        index: elements.indexOf(element),
    }
};
export const initialState = {
    elements: [],
    currentCountdownElment: null,
    isLoading: false,
    loadingError: null

}

export function timeboxesReducer(state = initialState, action) {
    switch (action.type) {
        case MANGEDLIST_ACTION.ELEMENTS_SET:
            return { ...state, elements: action.elements, currentCountdownElment: action.elements.length > 0 ? action.elements[0] : null };
        case MANGEDLIST_ACTION.ELEMENT_REMOVE: {
            const elements = state.elements.filter((value) => value.uid === action.element.uid ? false : true);
            return { ...state, elements };
        }
        case MANGEDLIST_ACTION.ELEMENT_ADD: {
            return { ...state, elements: [...state.elements, action.element] }
        }
        case MANGEDLIST_ACTION.ELEMENT_REPLACE: {
            const elements = state.elements.map((value) => { //TODOa1 tego mapa spróbować zedytować według uwag z konsultacji
                return value.uid === action.element.uid ? { ...action.element } : value
            })
            return { ...state, elements };
        }
        case MANGEDLIST_ACTION.CURRENT_COUNTDOWN_ELEMENT_SET: {
            const index = state.elements.findIndex((comparableElement) => comparableElement.uid === action.element.uid);
            //TODOa1 refactor w/w handlerów z (id) na findElement z hooka useDND ? 
            //findElement do czegoś wspólnego przenieść ?

            return { ...state, currentCountdownElment: state.elements[index] }
        }
        case MANGEDLIST_ACTION.ELEMENT_MOVE:
            {
                const { element, index } = findElement(state.elements, action.uid)
                const { /*element: atElement,*/ index: atIndex } = findElement(state.elements, action.atUid)
                const elements = update(state.elements, {
                    $splice: [
                        [index, 1],
                        [atIndex, 0, element],
                    ],
                });
                return { ...state, elements };
            }
        case MANGEDLIST_ACTION.LOADING_STATUS_FALSE: {
            // debugger;
            return { ...state, isLoading: false };
        }
        case MANGEDLIST_ACTION.LOADING_STATUS_TRUE: {
            // debugger;
            return { ...state, isLoading: true };
        }
        case MANGEDLIST_ACTION.LOADING_ERROR_SET: {
           
            return { ...state, loadingError: action.loadingError };
        }
        default:
            return state;
    }
}

//ki4 - combine reduxer i element timeboxList powoduje że nie mogę uniwersalności zastosować. To samo się tyczy rootReducer i timeboxesList oraz timeboxReducer.js
export const isLoadingError = (state) => state.timeboxList.loadingError ? true : false ;
export const getLoadingError = (state) => state.timeboxList.loadingError;
export const isLoading = (state) => state.timeboxList.isLoading;
export const getAllElements = (state) => state.timeboxList.elements;
export const getCurrentCountdownElement = (state) => state.timeboxList.currentCountdownElment;
// function initializeState(arg_initialState) { 
//     return arg_initialState;
// }