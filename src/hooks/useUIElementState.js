import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import {
    initializeUIState,
    setUIState as reducer_setUIState,
    getUIState
} from "../redux/uiElementStateReducer";

export default function useUIElementState(id) {
    const [isInitialized, setIsInitialized] = useState(false);
    const dispatch = useDispatch();
    if (!isInitialized) {
        // debugger;
        dispatch(initializeUIState({ id }));
        setIsInitialized(true);
    }

    const setUIState = useCallback(
        (uiState) => {         
            dispatch(reducer_setUIState({ id, uiState }));
        }, [dispatch, id]
    );

    return {setUIState, getUIState };
}