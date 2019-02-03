import { MILLISECONDS_PER_DAY, SET_DATE } from "../constants";
import { creditSavings } from "./creditSavings";

test("Test interest accumulate", () => {
    expect(
        creditSavings(
            {
                interestDay: 0,
                interestRate: 0.1,
                totalSavings: 10,
                interestAccumulated: 0,
                weeklySavings: 5,
                transactionDate: {
                    savings: 5 * MILLISECONDS_PER_DAY
                },
                amortization: []
            },
            { type: SET_DATE, payload: 5 * MILLISECONDS_PER_DAY }
        )
    ).toMatchObject({
        interestDay: 5 * MILLISECONDS_PER_DAY,
        interestRate: 0.1,
        totalSavings: 15,
        interestAccumulated: (10 * 5 * 0.1) / 365.25,
        transactionDate: {
            savings: 12 * MILLISECONDS_PER_DAY
        },
        amortization: [
            {
                date: 5 * MILLISECONDS_PER_DAY,
                amount: 5,
                type: "Savings",
                balance: 15
            }
        ]
    });
});
