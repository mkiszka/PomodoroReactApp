//3:21
//4:06
//8:10
export const FetchTimeboxAPI = {
    timeboxes: [],
    getAllTimeboxes: async function () {
        
        return [...this.timeboxes];
    },

    addTimebox: async function (timeboxToAdd) {        

    },
    replaceTimebox: async function (timeboxToReplace) {                
    },
    removeTimebox: async function (uid) {
      
    },    
};


async function makeRequest(url,method,body) {
    //12:22
}