import { SET_DATE } from "../constants";
import { interestAccumulatorReducer } from "./accumulateInterst";

export function creditSavings(state, action) {
    var newState = interestAccumulatorReducer(state, action);

    if (
        action.type === SET_DATE &&
        action.payload === newState.transactionDate.savings
    ) {
        const currentDate = new Date(action.payload);

        newState.totalSavings += newState.weeklySavings;
        newState.transactionDate.savings = new Date(
            Date.UTC(
                currentDate.getUTCFullYear(),
                currentDate.getUTCMonth(),
                currentDate.getUTCDate() + 7
            )
        ).valueOf();
        newState.amortization.push({
            date: action.payload,
            amount: newState.weeklySavings,
            type: "Savings",
            balance: newState.totalSavings
        });
    }

    return newState;
}
