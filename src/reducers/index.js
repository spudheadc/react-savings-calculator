import { SET_SAVINGS } from "../constants";
import { SET_AMOUNT } from "../constants";
import { SET_RATE } from "../constants";
import interest from "./interest";
import creditSavings from "./creditSavings";
import interestAccumulator from "./accumulateInterst";
import datesCalc from "./datesCalc";

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

    if (newState.dates === undefined) {
        newState.dates = [];

        newState.dates = datesCalc(currentDate, creditSavings, interest);
    }

    var simData = Object.assign(
        {
            interestAccumulated: 0,
            interestDay: currentDate.valueOf()
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

    simData = simData.dates.reduce((acc, date) => {
        acc = interestAccumulator.process(acc, date);
        acc = creditSavings.process(acc, date);
        acc = interest.process(acc, date);
        return acc;
    }, simData);

    newState.totalInterest = Math.round(simData.totalInterest * 100) / 100;
    newState.totalSavings = Math.round(simData.totalSavings * 100) / 100;
    newState.interestRate = Math.round(simData.interestRate * 100);
    newState.amortization = simData.amortization;

    return newState;
}
export default rootReducer;
