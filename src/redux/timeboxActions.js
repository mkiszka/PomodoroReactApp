import { TIMEBOXACTION } from "./timeboxReducer";

//action creators
export const timeboxPlay = () => ({ type: TIMEBOXACTION.PLAY })
export const timeboxStop = () => ({ type: TIMEBOXACTION.STOP })
export const timeboxInitializeTimerState = () => ({ type: TIMEBOXACTION.INITIALIZE_TIMER_STATE })
export const timeboxUpdateTimer = () =>  ({ type: TIMEBOXACTION.TICK});
export const timeboxPause = (pauseTime) => ({ type: TIMEBOXACTION.PAUSE, pauseTime});
export const timeboxUpdateTimeInMinues = (timeInMinutes) => ({ type: TIMEBOXACTION.UPDATE_TOTAL_TIME_IN_MINUTES, timeInMinutes})