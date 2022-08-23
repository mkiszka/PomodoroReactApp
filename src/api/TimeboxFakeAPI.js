import CookiesApi from 'universal-cookie';
import { v4 as uuidv4 } from 'uuid';

function wait(ms) {
    return new Promise((resolve) => { setTimeout(() => resolve(), ms) });
}

const COOKIE_TIMEBOXES = 'timeboxes';
const cookies = new CookiesApi();
//TODO reakcja aplikacji na błędny accessToken
export const TimeboxFakeAPI = {
    timeboxes: cookies.get(COOKIE_TIMEBOXES, { path: '/' }) ||
        [
            { uid: uuidv4(), title: "Wywołanie eventów", totalTimeInMinutes: 3 },
            { uid: uuidv4(), title: "KP-3034 Migracja z ver 1.14 do 1.15 usuwa powiązanie pacjent pracownik.", totalTimeInMinutes: 20 },
            { uid: uuidv4(), title: "KP-3104 Deploy webserwisu zamówień dla 1.15", totalTimeInMinutes: 20 },
        ],
    checkAccessToken: async function (accessToken) {
        if (accessToken === 'aa-bb-cc') {
            return true;
        }
        return false;
    },
    getAllTimeboxes: async function (accessToken) {
        await wait(200);
        if (await this.checkAccessToken(accessToken)) {
            return [...this.timeboxes];
        }
        return [];
    },

    addTimebox: async function (accessToken, timeboxToAdd) {
        await wait(200);
        if (! await this.checkAccessToken(accessToken)) {
            return;
        }
        this.timeboxes.splice(0, 0, timeboxToAdd)
        this.updateTimeboxesInsideCookie();

    },
    replaceTimebox: async function (accessToken, timeboxToReplace) {
        await wait(200);
        if (! await this.checkAccessToken(accessToken)) {
            return;
        }        
        this.timeboxes = this.timeboxes.map((value) => value.uid === timeboxToReplace.uid ? timeboxToReplace : value)
        this.updateTimeboxesInsideCookie();
    },
    removeTimebox: async function (accessToken, timeboxToDelete) {
        await wait(200);
        if (! await this.checkAccessToken(accessToken)) {
            return;
        }
        this.timeboxes = this.timeboxes.filter((value) => value.uid === timeboxToDelete.uid ? false : true);
        this.updateTimeboxesInsideCookie();       
    },
    updateTimeboxesInsideCookie: function () {
        cookies.set(COOKIE_TIMEBOXES, this.timeboxes, { path: '/' });
    }
};