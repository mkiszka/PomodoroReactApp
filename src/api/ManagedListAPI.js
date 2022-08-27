//Adapter 
class ManagedListAPI {
    constructor(timeboxesAPI, url = "http://localhost:5000/") {
       
        this.timeboxesAPI = timeboxesAPI;
        this.timeboxesAPI.url = url;        
    }

    removeElement = async (accessToken, timeboxToDelete) => { this.timeboxesAPI.removeTimebox(accessToken, timeboxToDelete); };
    getAllElements = async (accessToken) => { return this.timeboxesAPI.getAllTimeboxes(accessToken) };
    replaceElement = async (accessToken, timeboxToReplace) => { return this.timeboxesAPI.replaceTimebox(accessToken, timeboxToReplace) };
    addElement = async (accessToken, timeboxToAdd) => { return this.timeboxesAPI.addTimebox(accessToken,timeboxToAdd)};
}
export default ManagedListAPI;