import { MILLISECONDS_PER_DAY, SET_DATE } from "../constants";

export function interestAccumulatorReducer(state, action) {
    var newState = Object.assign({}, state);
    if (action.type === SET_DATE) {
        const interestDays =
            (action.payload - newState.interestDay) / MILLISECONDS_PER_DAY;
        var accumulatedInterest =
            (newState.interestRate * newState.totalSavings * interestDays) /
            365.25;
        newState.interestAccumulated += accumulatedInterest;
        newState.interestDay = action.payload;
    }

    return newState;
}
