import { combineReducers } from "redux";
import { timeboxesReducer } from "./managedListReducer";
import { timeboxReducer } from "./timeboxReducer";

const rootReducer = combineReducers({
    timebox: timeboxReducer,
    timeboxList: timeboxesReducer
})

export default rootReducer;