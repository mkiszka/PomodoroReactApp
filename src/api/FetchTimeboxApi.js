const BASE_URL = "http://localhost:5000/timeboxes"
const FetchTimeboxesAPI = {
    getAllTimeboxes: async function() {        
        const response = await makeRequest(`${BASE_URL}`, "GET")
        const timeboxes = await response.json();
        return timeboxes;
    },
    addTimebox: async function(timeboxToAdd) {
        const response = await makeRequest(`${BASE_URL}`, "POST", timeboxToAdd)
        const addedTimebox = await response.json();
        return addedTimebox;
    },
    replaceTimebox: async function(timeboxToReplace) {
        if (!timeboxToReplace.id) {
            throw new Error("Timebox has to have an id to be updated");
        }
        const response = await makeRequest(`${BASE_URL}/${timeboxToReplace.id}`, "PUT", timeboxToReplace)
        const replacedTimebox = await response.json();
        return replacedTimebox;
    },
    removeTimebox: async function(timeboxToRemove) {
        if (!timeboxToRemove.id) {
            throw new Error("Timebox has to have an id to be updated");
        }
        await makeRequest(`${BASE_URL}/${timeboxToRemove.id}`, "DELETE")
    }
}

export default FetchTimeboxesAPI;

async function makeRequest(url, method, body) {
    
    const jsonBody = body ? JSON.stringify(body) : undefined;
    const response = await window.fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: jsonBody
    });
    if (!response.ok) {
        throw new Error("Something went wrong!");
    }
    return response;
}