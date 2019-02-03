import { SET_DATE } from "../constants";
import { interestAccumulatorReducer } from "./accumulateInterst";

export function interestReducer(state, action) {
    var newState = interestAccumulatorReducer(state, action);

    if (
        action.type === SET_DATE &&
        action.payload === newState.transactionDate.interest
    ) {
        const flooredInterest =
            Math.floor(newState.interestAccumulated * 100) / 100;
        const currentDate = new Date(action.payload);
        newState.totalSavings += flooredInterest;
        newState.totalInterest += flooredInterest;
        newState.interestAccumulated -= flooredInterest;
        newState.transactionDate.interest = new Date(
            Date.UTC(
                currentDate.getUTCFullYear(),
                currentDate.getUTCMonth() + 1,
                newState.startDate.getUTCDate()
            )
        ).valueOf();
        newState.amortization.push({
            date: action.payload,
            amount: flooredInterest,
            type: "Interest",
            balance: newState.totalSavings
        });
    }

    return newState;
}
