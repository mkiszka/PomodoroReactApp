import { TimeboxFakeAPI } from "../api/TimeboxFakeAPI";
//TODO zmienić na funkcje a nie hook
function useTimeboxAPI() {
    return [
        TimeboxFakeAPI
    ];
}
//TODO Adapter
// removeElementAPI,
// getAllElementsAPI,
// replaceElementAPI
export { useTimeboxAPI };