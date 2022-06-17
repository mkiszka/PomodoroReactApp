import { convertMiliSecondsToMiliSecondsSecondMinutesHours } from '../../utilities/time';
describe("convertMiliSecondsToMiliSecondsSecondMinutesHours", () => {
    describe("for timeInMiliSeconds lower than 120 seconds", () => {
        it("return 1 minute for 6000 miliseconds", () => {
            expect(convertMiliSecondsToMiliSecondsSecondMinutesHours(60000))
                .toEqual([0, 0, 1, 0]);
        });
        it("return 2 minutes for 120000 miliseconds", () => {
            expect(convertMiliSecondsToMiliSecondsSecondMinutesHours(120000))
                .toEqual([0, 0, 2, 0]);
        });
        it("return 1 minutes 34 seconds 10 miliseconds for 120000 miliseconds", () => {
            expect(convertMiliSecondsToMiliSecondsSecondMinutesHours(94010))
                .toEqual([10, 34, 1, 0]);
        });
    });
    describe("for time in mili seconds from 30 minutes to 3 hours", () => {
        it("return 30 minutes for 1800000 miliseconds", () => {
            expect(convertMiliSecondsToMiliSecondsSecondMinutesHours(1800000))
                .toEqual([0, 0, 30, 0]);
        });
        it("return 3 hours for 1800000 miliseconds", () => {
            expect(convertMiliSecondsToMiliSecondsSecondMinutesHours(10800000))
                .toEqual([0, 0, 0, 3]);
        });
        it("return 2 hours 30 minutes 20 seconds 1 milisecond for 9020001 miliseconds", () => {
            expect(convertMiliSecondsToMiliSecondsSecondMinutesHours(9020001))
                .toEqual([1, 20, 30, 2]);
        });
    });
});