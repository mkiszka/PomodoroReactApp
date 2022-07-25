//ki3 czy tutaj w tym hooku też zwracać komponent ? czy to już za dużo ?

import { useAuthenticationContext } from "./useAuthenticationContext";
import { useTimeboxAPI } from "./useTimeboxAPI";

function useTimeboxCreator(setTimeboxes) {

    const { accessToken } = useAuthenticationContext();

    const [TimeboxApi] = useTimeboxAPI();

    
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
    return [
        handleCreatorAdd
    ];
}

export { useTimeboxCreator };