//ki4 mocno do obgadania wygląd poniższej struktury reduxowej
export const TIMEBOXACTION = {
    PLAY: 'timebox/play',
    STOP: 'timebox/stop',
    PAUSE: 'timebox/pause',
    SET_LAST_INTERVAL_TIME: 'timebox/setLastIntervalTime',
    TICK: 'timebox/tick',
    INITIALIZE_TIMER_STATE: 'timebox/initializeTimerState',
    UPDATE_TOTAL_TIME_IN_MINUTES: 'timebox/updateTotalTimeInMinutes'
}
const initialState = {
    lastIntervalTime: 0,
    isRunning: false,
    isPaused: false,
    pausesCount: 0,
    pauseTime: null,
    elapsedTimeInMiliSeconds: 0,
    totalTimeInMiliSeconds: 0
}
//selectors
export const getLastIntervalTime = (state) => state.timebox.lastIntervalTime;
export const isRunning = (state) => state.timebox.isRunning;
export const isPaused = (state) => state.timebox.isPaused;
export const getPausesCount = (state) => state.timebox.pausesCount;
export const getElapsedTimeInMiliSeconds = (state) => state.timebox.elapsedTimeInMiliSeconds;
export const getTotalTimeInMiliSeconds = (state) => state.timebox.totalTimeInMiliSeconds;

//reducer
export const timeboxReducer =  (state = initialState, action) => { // (state= initialState, {type, payload} inaczej const timeboxReducer =  (state = initialState, action)
  switch (action.type) {

    case TIMEBOXACTION.PLAY: {
        if( state.isPaused ) {
            return { ...state, isPaused: false, elapsedTimeInMiliSeconds: state.elapsedTimeInMiliSeconds + state.pauseTime - state.lastIntervalTime  }
        } else {
            return { ...initialState, isRunning: true }
        }
    }
    case TIMEBOXACTION.STOP: {
        return { ...initialState }
    }
    case TIMEBOXACTION.PAUSE: {
        return { ...state, isPaused: true, pausesCount: state.pausesCount + 1, pauseTime: action.pauseTime }
    }
    case TIMEBOXACTION.INITIALIZE_TIMER_STATE: {
        return { ...state, lastIntervalTime: new Date().getTime() }
    }
    case TIMEBOXACTION.UPDATE_TOTAL_TIME_IN_MINUTES: {
        debugger;
        return { ...state, totalTimeInMiliSeconds: action.totalTimeInMinutes * 6000 }
    }
   
    case TIMEBOXACTION.TICK: {
        const now = new Date().getTime();
        const elapsedTimeInMiliSeconds = state.elapsedTimeInMiliSeconds  + new Date().getTime() - state.lastIntervalTime;
       // const totalTimeInMiliSeconds = state.totalTimeInMinutes * 60000;

        return { ...state, elapsedTimeInMiliSeconds, lastIntervalTime: now }
    }
    default:
        return state
  }
}