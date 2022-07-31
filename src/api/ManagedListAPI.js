//Adapter 
class ManagedListAPI {
    constructor(timeboxesAPI) {
        this.timeboxesAPI = timeboxesAPI;
    }

    removeElement = async (accessToken, uid) => { this.timeboxesAPI.removeTimebox(accessToken, uid); };
    getAllElements = async (accessToken) => { return this.timeboxesAPI.getAllTimeboxes(accessToken) };
    replaceElement = async (accessToken, timeboxToReplace) => { this.timeboxesAPI.replaceTimebox(accessToken, timeboxToReplace) };
    addElement = async (accessToken, timeboxToAdd) => { this.timeboxesAPI.addTimebox(accessToken,timeboxToAdd)};
}
export default ManagedListAPI;