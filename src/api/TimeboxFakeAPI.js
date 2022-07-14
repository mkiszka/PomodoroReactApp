import CookiesApi from 'universal-cookie';
import { v4 as uuidv4 } from 'uuid';

function wait(ms) {
    return new Promise((resolve) => { setTimeout(() => resolve(), ms) });
}

const COOKIE_TIMEBOXES = 'timeboxes';
const cookies = new CookiesApi();
export const TimeboxFakeAPI = {
    timeboxes: cookies.get(COOKIE_TIMEBOXES, { path: '/' }) ||
        [
            { uid: uuidv4(), title: "Wywołanie eventów", totalTimeInMinutes: 3 },
            { uid: uuidv4(), title: "KP-3034 Migracja z ver 1.14 do 1.15 usuwa powiązanie pacjent pracownik.", totalTimeInMinutes: 20 },
            { uid: uuidv4(), title: "KP-3104 Deploy webserwisu zamówień dla 1.15", totalTimeInMinutes: 20 },
        ],
    getAllTimeboxes: async function () {
        await wait(200);        
        return [...this.timeboxes];
    },

    addTimebox: async function (timeboxToAdd) {
        await wait(200);
        this.timeboxes.splice(0, 0, timeboxToAdd)
        this.updateTimeboxesInsideCookie();

    },
    replaceTimebox: async function (timeboxToReplace) {        
        await wait(200);
        debugger;
        this.timeboxes = this.timeboxes.map((value) => value.uid === timeboxToReplace.uid ? timeboxToReplace : value)
        this.updateTimeboxesInsideCookie();        
    },
    removeTimebox: async function (uid) {        
        await wait(200);
        this.timeboxes = this.timeboxes.filter((value) => value.uid === uid ? false : true);        
        this.updateTimeboxesInsideCookie();
        console.log(cookies.get(COOKIE_TIMEBOXES, { path: '/' }));
    },
    updateTimeboxesInsideCookie: function () {
        cookies.set(COOKIE_TIMEBOXES, this.timeboxes, { path: '/' });
    }
};