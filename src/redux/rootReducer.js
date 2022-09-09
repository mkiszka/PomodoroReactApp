import { combineReducers } from "redux";
import { authentificationReducer } from "./authentificationReducer";
import { timeboxesReducer } from "./managedListReducer";
import { timeboxReducer } from "./timeboxReducer";

const rootReducer = combineReducers({
    timebox: timeboxReducer,
    timeboxList: timeboxesReducer,
    auth: authentificationReducer
})

export default rootReducer;