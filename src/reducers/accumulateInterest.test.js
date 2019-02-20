import { MILLISECONDS_PER_DAY, SET_DATE } from "../constants";
import interestAccumulator from "./accumulateInterst";

test("Test interest accumulate", () => {
    expect(
        interestAccumulator.process(
            {
                interestDay: 0,
                interestRate: 0.1,
                totalSavings: 10,
                interestAccumulated: 0,
                dates: [
                    {
                        date: 5 * MILLISECONDS_PER_DAY
                    }
                ]
            },
            { index: 0, date: 5 * MILLISECONDS_PER_DAY }
        )
    ).toMatchObject({
        interestDay: 5 * MILLISECONDS_PER_DAY,
        interestRate: 0.1,
        totalSavings: 10,
        interestAccumulated: (10 * 5 * 0.1) / 365.25
    });
});
