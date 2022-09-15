import { createSlice } from "@reduxjs/toolkit";
import { TIMEBOXLISTELEMENT_STATE } from "./TIMEBOXLISTELEMENT_STATE";

const initialUIState = {
    uiState: TIMEBOXLISTELEMENT_STATE.NONEDITABLE
};
const uiElementStateSlice = createSlice({
    name: 'uiElementState',
    initialState: { },
    reducers: {
        initializeUIState(state, action) {
           
            // state.uiElementState[action.payload.id] = { ...initialUIState };
            state[action.payload.id] = { ...initialUIState };
        },
        setUIState(state, action) {
            state[action.payload.id].uiState = action.payload.uiState;
        }        
    }
});

//actions
export const { initializeUIState, setUIState } = uiElementStateSlice.actions;
export default uiElementStateSlice.reducer;
//selectors
export const getUIState = (id) => (state) => {
    return state?.uiElementState?.[id]?.uiState ?? null;
}
