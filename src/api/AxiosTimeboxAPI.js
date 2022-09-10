//3:21
//4:06
///////// for auth Set axios common headers with setAuthToken()
import axios from "axios";
//8:10
export const AxiosTimeboxAPI = {
    url: "",
    timeboxesPathname: "timeboxes",
    timeboxes: [],
    getURL: function () {
        let url = new URL(this.url);
        url.pathname = this.timeboxesPathname;
        return url;
    },
    getHeaders: function (accessToken) {        
        let res = {};
        // const accessToken = localStorage.getItem('accessToken');
        if (!!accessToken) {
            res.Authorization = `Bearer ${accessToken}`;
        }
        return res;
    },
    getAllTimeboxes: async function (accessToken) {
        const response = await axios.get(`${this.getURL()}?_sort=order`, { headers: this.getHeaders(accessToken) });
        return response.data;

    },

    addTimebox: async function (accessToken, timeboxToAdd) {           
        const response = await axios.post(this.getURL(), timeboxToAdd, { headers: this.getHeaders(accessToken) });
        return response.data;
    },
    replaceTimebox: async function (accessToken, timeboxToReplace) {     
        const response = await axios.put(`${this.getURL()}/${timeboxToReplace.id}`, timeboxToReplace, { headers: this.getHeaders(accessToken) });
        return response.data;
    },
    removeTimebox: async function (accessToken, timeboxToDelete) {
      /*const response = */await axios.delete(`${this.getURL()}/${timeboxToDelete.id}`, { headers: this.getHeaders(accessToken) })
    },
};