import { MILLISECONDS_PER_DAY, SET_DATE } from "../constants";
import { interestReducer } from "./interest";

const accumualtedInterest = Math.floor(((10 * 5 * 0.1) / 365.25) * 100) / 100;
const zeroDate = new Date(0 * MILLISECONDS_PER_DAY);
const nextDate = new Date(
    Date.UTC(
        zeroDate.getUTCFullYear(),
        zeroDate.getUTCMonth() + 1,
        zeroDate.getUTCDate()
    )
).valueOf();
test("Test interest accumulate", () => {
    expect(
        interestReducer(
            {
                interestDay: 0,
                interestRate: 0.1,
                totalSavings: 10,
                totalInterest: 0,
                interestAccumulated: 0,
                startDate: zeroDate,
                transactionDate: {
                    interest: 5 * MILLISECONDS_PER_DAY
                },
                amortization: []
            },
            { type: SET_DATE, payload: 5 * MILLISECONDS_PER_DAY }
        )
    ).toMatchObject({
        interestDay: 5 * MILLISECONDS_PER_DAY,
        interestRate: 0.1,
        totalSavings: 10 + accumualtedInterest,
        totalInterest: accumualtedInterest,
        interestAccumulated: (10 * 5 * 0.1) / 365.25 - accumualtedInterest,
        transactionDate: {
            interest: nextDate
        },
        amortization: [
            {
                date: 5 * MILLISECONDS_PER_DAY,
                amount: accumualtedInterest,
                type: "Interest",
                balance: 10 + accumualtedInterest
            }
        ]
    });
});
