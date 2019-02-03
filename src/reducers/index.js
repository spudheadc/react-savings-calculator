import { SET_SAVINGS } from "../constants";
import { SET_AMOUNT } from "../constants";
import { SET_RATE } from "../constants";
import { setDate } from "../actions/setDate";
import { interestReducer } from "./interest";
import { creditSavings } from "./creditSavings";

const currentDate = new Date();
const initialState = {
    weeklySavings: 0,
    initialBalance: 1000,
    interestRate: 7
};
function rootReducer(state = initialState, action) {
    var newState = Object.assign(Object.assign({}, state), {
        amortization: []
    });

    if (action.type === SET_SAVINGS) {
        newState.weeklySavings = Number(action.payload);
    }

    if (action.type === SET_AMOUNT) {
        newState.initialBalance = Number(action.payload);
    }
    if (action.type === SET_RATE) {
        newState.interestRate = Number(action.payload);
    }
    var simData = Object.assign(
        {
            finalDate: new Date(
                Date.UTC(
                    currentDate.getUTCFullYear() + 4,
                    currentDate.getUTCMonth(),
                    currentDate.getUTCDate()
                )
            ).valueOf(),
            startDate: currentDate,
            interestDay: currentDate.valueOf(),
            interestAccumulated: 0,
            transactionDate: {
                interest: new Date(
                    Date.UTC(
                        currentDate.getUTCFullYear(),
                        currentDate.getUTCMonth() + 1,
                        currentDate.getUTCDate()
                    )
                ).valueOf(),
                savings: new Date(
                    Date.UTC(
                        currentDate.getUTCFullYear(),
                        currentDate.getUTCMonth(),
                        currentDate.getUTCDate() + 7
                    )
                ).valueOf()
            }
        },
        newState
    );
    simData.interestRate /= 100;
    simData.totalInterest = 0;
    simData.totalSavings = newState.initialBalance;

    var date = currentDate.valueOf();
    newState.amortization.push({
        date: currentDate,
        amount: simData.totalSavings,
        type: "Initial Balance",
        balance: simData.totalSavings
    });
    while (date <= simData.finalDate) {
        //Note: we do not dispatch the action to the store. This action is solely used within this loop
        const dateAction = setDate(date);
        simData = creditSavings(simData, dateAction);
        simData = interestReducer(simData, dateAction);

        date = Math.min(
            simData.transactionDate.savings,
            simData.transactionDate.interest
        );
    }

    newState.totalInterest = Math.round(simData.totalInterest * 100) / 100;
    newState.totalSavings = Math.round(simData.totalSavings * 100) / 100;
    newState.interestRate = Math.round(simData.interestRate * 100);
    newState.amortization = simData.amortization;

    return newState;
}
export default rootReducer;
