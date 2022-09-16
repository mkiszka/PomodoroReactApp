import { configureStore } from '@reduxjs/toolkit';

import thunk from 'redux-thunk';
import AuthenticationAPI from './api/FetchAuthenticationAPI';
import ManagedListAPI from './api/ManagedListAPI';
import { AxiosTimeboxAPI } from './api/AxiosTimeboxAPI';
import timeboxReducer/*, * as timeboxeSelectors */ from './redux/timeboxReducer';
import timeboxesReducer/*, * as timeboxesSelectors */ from './redux/managedListReducer';
import { authentificationReducer } from './redux/authentificationReducer';
import uiElementStateReducer from './redux/uiElementStateReducer';


export const store = configureStore({
    reducer: {
        timebox: timeboxReducer,
        timeboxList: timeboxesReducer,
        auth: authentificationReducer,
        uiElementState: uiElementStateReducer
    }, 
    middleware: [thunk.withExtraArgument({ authenticationAPI: AuthenticationAPI,
                                                                 managedListAPI: new ManagedListAPI(AxiosTimeboxAPI)
                                                               })]
});


//ki5 - Na kursie propozycja 
//propozycja posiadania globalnych selektorów
//jednak taki getTotalTimeInMiliSeconds nie wiadomo której części dotyczy,
//osobiście wolałbym posiadać selektory improtwane z konkretnego pliku reducra, bo wtedy wiem którego on dotyczy
//choć jak ktoś inny ma szukać selektorów po różnych plikach ? może to nie jest dobre.
// export const getLastIntervalTime = (state) => timeboxeSelectors.getLastIntervalTime(state.timebox);
// export const isRunning = (state) => timeboxeSelectors.isRunning(state.timebox);
// export const isPaused = (state) => timeboxeSelectors.isPaused(state.timebox);
// export const getPausesCount = (state) => timeboxeSelectors.pausesCount(state.timebox);
// export const getElapsedTimeInMiliSeconds = (state) => timeboxeSelectors.elapsedTimeInMiliSeconds(state.timebox);
// export const getTotalTimeInMiliSeconds = (state) => timeboxeSelectors.totalTimeInMiliSeconds(state.timebox);
