import { SET_DATE } from "../constants";

export default {
    process(state, payload) {
        if (payload.interest) {
            var newState = Object.assign({}, state);
            const flooredInterest =
                Math.floor(newState.interestAccumulated * 100) / 100;
            newState.totalSavings += flooredInterest;
            newState.totalInterest += flooredInterest;
            newState.interestAccumulated -= flooredInterest;
            newState.amortization.push({
                date: payload.date,
                amount: flooredInterest,
                type: "Interest",
                balance: newState.totalSavings
            });
            return newState;
        }
        return state;

    },
    calculateDate(state, payload) {
        var newState = Object.assign({}, state);
        if (payload.date === newState.transactionDate.interest) {
            const currentDate = new Date(payload.date);
            var nextDate = new Date(
                Date.UTC(
                    currentDate.getUTCFullYear(),
                    currentDate.getUTCMonth() + 1,
                    newState.startDate.getUTCDate()
                )
            );
            newState.transactionDate.interest = nextDate.valueOf();
            if (newState.dates[payload.index] === undefined)
                newState.dates[payload.index] = {
                    date: payload.date,
                    index: payload.index
                };

            newState.dates[payload.index].interest = {
                date: payload.date,
                next: newState.transactionDate.interest
            };
        }

        return newState;
    }
};
