import { SET_DATE } from "../constants";

export default {
    process(state, payload) {
        if (payload.savings) {
            var newState = Object.assign({}, state);
            newState.totalSavings += newState.weeklySavings;
            newState.amortization.push({
                date: payload.date,
                amount: newState.weeklySavings,
                type: "Savings",
                balance: newState.totalSavings
            });
            return newState;
        }
        return state;
    },

    calculateDate(state, payload) {
        var newState = Object.assign({}, state);
        if (payload.date === newState.transactionDate.savings) {
            const currentDate = new Date(payload.date);
            var nextDate = new Date(
                Date.UTC(
                    currentDate.getUTCFullYear(),
                    currentDate.getUTCMonth(),
                    currentDate.getUTCDate() + 7
                )
            );
            newState.transactionDate.savings = nextDate.valueOf();
            if (newState.dates[payload.index] === undefined)
                newState.dates[payload.index] = {
                    date: payload.date,
                    index: payload.index
                };

            newState.dates[payload.index].savings = {
                date: payload.date,
                next: newState.transactionDate.savings
            };
        }

        return newState;
    }
};
