function datesCalc(currentDate, creditSavings, interest)
{
    var datesObj = {
        finalDate: new Date(
            Date.UTC(
                currentDate.getUTCFullYear() + 4,
                currentDate.getUTCMonth(),
                currentDate.getUTCDate()
            )
        ).valueOf(),
        startDate: currentDate,
        interestDay: currentDate.valueOf(),
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
        },
        dates: []
    };
    var date = currentDate.valueOf();

    while (date <= datesObj.finalDate) {
        var item = {
            date: date,
            index: datesObj.dates.length
        };
        datesObj = creditSavings.calculateDate(datesObj, item);
        datesObj = interest.calculateDate(datesObj, item);

        date = Math.min(
            datesObj.transactionDate.savings,
            datesObj.transactionDate.interest
        );
    }

    return datesObj.dates;
}
export default datesCalc;