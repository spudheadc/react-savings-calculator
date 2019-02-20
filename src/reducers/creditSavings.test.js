import { MILLISECONDS_PER_DAY, SET_DATE } from "../constants";
import savings from "./creditSavings";

test("Test interest accumulate", () => {
    expect(
        savings.process(
            {
                totalSavings: 10,
                weeklySavings: 5,
                dates: [
                    {
                        savings: {
                            date: 5 * MILLISECONDS_PER_DAY,
                            next: 12 * MILLISECONDS_PER_DAY
                        }
                    }
                ],
                amortization: []
            },
            { index: 0, date: 5 * MILLISECONDS_PER_DAY }
        )
    ).toMatchObject({
        totalSavings: 15,
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

test("Test dates", () => {
    expect(
        savings.calculateDate(
            {
                transactionDate: {
                    savings: 5 * MILLISECONDS_PER_DAY
                },
                dates: []
            },
            { date: 5 * MILLISECONDS_PER_DAY, index: 0 }
        )
    ).toMatchObject({
        transactionDate: {
            savings: 12 * MILLISECONDS_PER_DAY
        },
        dates: [
            {
                date: 5 * MILLISECONDS_PER_DAY,
                index: 0,
                savings: {
                    date: 5 * MILLISECONDS_PER_DAY,
                    next: 12 * MILLISECONDS_PER_DAY
                }
            }
        ]
    });
});
