//3:21
//4:06

import axios from "axios";

window.axio = axios;
//8:10
export const AxiosTimeboxAPI = {
    url: "",
    timeboxesPathname: "timeboxes/",  
    timeboxes: [],
    getURL: function() {
        let url = new URL(this.url);
        url.pathname = this.timeboxesPathname;
        return url;
    },
    getAllTimeboxes: async function (accessToken) {            
        const response = await axios.get(this.getURL());        
        return response.data;
        
    },

    addTimebox: async function (accessToken,timeboxToAdd) {        
        const response = await axios.post(this.getURL(),timeboxToAdd)
        return response.data;
    },
    replaceTimebox: async function (accessToken,timeboxToReplace) {    
        console.log(timeboxToReplace);
        const response = await axios.put(`${this.getURL()}/${timeboxToReplace.id}`,timeboxToReplace);
        return response.data;
    },
    removeTimebox: async function (accessToken,timeboxToDelete) {
      /*const response = */await axios.delete(`${this.getURL()}/${timeboxToDelete.id}`)
    },    
};


async function makeRequest(url,method,body) {
    //12:22
}