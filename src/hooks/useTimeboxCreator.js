//ki3 czy tutaj w tym hooku też zwracać komponent ? czy to już za dużo ?

import { useState } from "react";
import { useAuthenticationContext } from "./useAuthenticationContext";
import { useTimeboxApi } from "./useTimeboxApi";

function useTimeboxCreator(setTimeboxes) {

    const [accessToken] = useAuthenticationContext();
    const [title, setTitle] = useState("Ucze się tego i tamtego?");
    const [totalTimeInMinutes, setTotalTimeInMinutes] = useState('25');
    const [TimeboxApi] = useTimeboxApi();

    function handleTitleCreatorChange(event) {
        setTitle(event.target.value);
    }
    function handleTotalTimeInMinutesCreatorChange(event) {
        setTotalTimeInMinutes(event.target.value);
    }
    function handleCreatorAdd(timeboxToAdd) {
        
        TimeboxApi.addTimebox(accessToken, { ...timeboxToAdd }).then(() => {
            setTimeboxes(
                (prevTimeboxes) => {
                    return [timeboxToAdd, ...prevTimeboxes];
                }
            )
        });
    }
    //ki3 czy dobrze będzie jeżeli zwróce {} zamiast []
    // i dodam setTitl i setTotalTimeInMinutes, a {}
    // a {} po to żeby ktoś inny mógł wybrać czy setTitle
    // chce użyć, choć wydaje się, że tutaj nieporzadane byłoby
    //wystawianie setTitle
    return [title,
        totalTimeInMinutes, 
        handleTitleCreatorChange,
        handleTotalTimeInMinutesCreatorChange,
        handleCreatorAdd
    ];
}

export { useTimeboxCreator };