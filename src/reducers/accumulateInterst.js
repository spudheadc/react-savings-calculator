import { MILLISECONDS_PER_DAY, SET_DATE } from "../constants";

export default {
    process(state, payload) {
        var newState = Object.assign({}, state);

        const interestDays =
            (payload.date - newState.interestDay) / MILLISECONDS_PER_DAY;
        var accumulatedInterest =
            (newState.interestRate * newState.totalSavings * interestDays) /
            365.25;
        newState.interestAccumulated += accumulatedInterest;
        newState.interestDay = payload.date;

        return newState;
    }
};
