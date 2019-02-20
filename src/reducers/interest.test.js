import { MILLISECONDS_PER_DAY, SET_DATE } from "../constants";
import interest from "./interest";

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
        interest.process(
            {
                totalSavings: 10,
                totalInterest: 0,
                interestAccumulated: 5.001,
                dates: [
                    {
                        interest: {
                            date: 5 * MILLISECONDS_PER_DAY,
                            next: nextDate
                        }
                    }
                ],
                amortization: []
            },
            { index: 0, date: 5 * MILLISECONDS_PER_DAY }
        )
    ).toMatchObject({
        totalSavings: 15,
        totalInterest: 5,
        interestAccumulated: 5.001 - Math.floor(500.1) / 100,
        amortization: [
            {
                date: 5 * MILLISECONDS_PER_DAY,
                amount: 5,
                type: "Interest",
                balance: 15
            }
        ]
    });
});

test("Test dates", () => {
    expect(
        interest.calculateDate(
            {
                startDate: zeroDate,
                transactionDate: {
                    interest: 5 * MILLISECONDS_PER_DAY
                },
                dates: []
            },
            { date: 5 * MILLISECONDS_PER_DAY, index: 0 }
        )
    ).toMatchObject({
        transactionDate: {
            interest: nextDate
        },
        dates: [
            {
                date: 5 * MILLISECONDS_PER_DAY,
                index: 0,
                interest: {
                    date: 5 * MILLISECONDS_PER_DAY,
                    next: nextDate
                }
            }
        ]
    });
});
