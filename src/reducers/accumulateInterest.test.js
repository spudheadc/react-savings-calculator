import { MILLISECONDS_PER_DAY, SET_DATE } from "../constants";
import { interestAccumulatorReducer } from "./accumulateInterst";

test("Test interest accumulate", () => {
    expect(
        interestAccumulatorReducer(
            {
                interestDay: 0,
                interestRate: 0.1,
                totalSavings: 10,
                interestAccumulated: 0
            },
            { type: SET_DATE, payload: 5 * MILLISECONDS_PER_DAY }
        )
    ).toMatchObject({
        interestDay: 5 * MILLISECONDS_PER_DAY,
        interestRate: 0.1,
        totalSavings: 10,
        interestAccumulated: (10 * 5 * 0.1) / 365.25
    });
});
